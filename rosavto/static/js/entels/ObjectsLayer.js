define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/request/xhr',
    'dojo/i18n',
    'dojo/Deferred',
    'dojox/lang/functional/object',
    'entels/StyledGeoJsonLayer',
    'entels/ParametersVerification',
    'mustache/mustache',
    'dojo/text!entels/templates/Tooltip.html',
    'dojo/text!entels/templates/AttributesPopup.html',
    'dojo/i18n!./nls/ObjectsLayer'
], function (declare, lang, array, xhr, i18n, Deferred, obj, StyledGeoJsonLayer,
             ParametersVerification, mustache, TooltipTemplate, AttributesPopupTemplate) {
    return declare('entels.ObjectsLayer', [StyledGeoJsonLayer, ParametersVerification], {
        constructor: function () {
            this.verificateRequiredParameters(this.options, [
                'ngwServiceFacade',
                'layersInfo',
                'map',
                'layerKeyname',
                'scadaServiceFacade',
                'fieldId'
            ]);
            this._objects_layer_id = this.options.layersInfo.getLayersDictByKeyname()[this.options.layerKeyname].layer_id;
        },

        states: {
            'state-wait': 'Ожидаем связь...',
            'state-0': null,
            'state-1': 'SCADA: неопределенная ошибка',
            'state-2': 'SCADA: нет связи с сервером телеметрии',
            'state-3': 'SCADA: неопределенное состояние',
            'state-4': 'SCADA: нет связи с объектом',
            'state-5': 'SCADA: есть связь с объектом'
        },

        tooltips: {},

        onAdd: function (map) {
            StyledGeoJsonLayer.prototype.onAdd.call(this, map);
            this._hookMap(map);
            this._buildObjects().then(lang.hitch(this, function (guids) {
                this._subscribeObjectStatuses(guids);
            }));
        },

        onRemove: function (map) {
            this._unhookMap(map);
            StyledGeoJsonLayer.prototype.onRemove.call(this, map);
        },

        _hookMap: function (map) {
            map.on('moveend zoomend', this._buildObjects, this);
        },

        _unhookMap: function (map) {
            map.off('moveend zoomend', this._buildObjects, this);
        },

        _changeStyle: function (id, style) {
            var layer = this.layersById[id];
            if (!layer) return false;

            var geoJsonFeature = lang.clone(layer.feature);
            if (this.tooltips[id]) {
                array.forEach(this.tooltips[id], function (tooltip) {
                    tooltip.hide();
                    tooltip.remove();
                }, this);
            }
            delete this.tooltips[id];
            this.removeObject(id);

            var markerLayer = this.addObject(geoJsonFeature, style, id);
            this._markerLayerBindEvents(markerLayer, geoJsonFeature.properties, style);
        },

        _markerLayerBindEvents: function (markerLayer, objectProps, state) {
            var markers = this.getMarkers(markerLayer),
                lmap = this.options.map._lmap;
            objectProps.state = this.states[state];
            array.forEach(markers, function (marker) {
                var id = objectProps[this.options.fieldId];
                marker._id = id;

                if (!this.tooltips[id]) {
                    this.tooltips[id] = [];
                }

                this.tooltips[id].push(
                    L.tooltip({
                        target: marker,
                        map: lmap,
                        html: mustache.render(TooltipTemplate, objectProps),
                        showDelay: 0,
                        hideDelay: 0
                    })
                );

                marker.on('click', lang.hitch(this, function (markerClicked) {
                    this.options.scadaServiceFacade.getAttributesById(markerClicked.target._id)
                        .then(lang.hitch(this, function (result) {
                            var attrs = result.attrs;
                            for (var i = 0, l = attrs.length; i < l; i++) {
                                var attr = attrs[i];
                                if (attr.type) {
                                    attrs[i]['is_' + attr.type] = true;
                                }
                            }
                            lmap.openPopup(mustache.render(AttributesPopupTemplate, result), markerClicked.latlng);
                        }));
                }));
            }, this);

        },

        _buildObjects: function () {
            var bounds = this.options.map.getLMap().getBounds(),
                bounds3857 = {
                    _southWest: L.CRS.EPSG3857.project(bounds._southWest),
                    _northEast: L.CRS.EPSG3857.project(bounds._northEast)
                },
                extent3857 = [bounds3857._southWest.x, bounds3857._southWest.y, bounds3857._northEast.x, bounds3857._northEast.y],
                deferred = new Deferred();

            this.options.ngwServiceFacade.identifyFeaturesByLayers([this._objects_layer_id], extent3857, 3857)
                .then(lang.hitch(this, function (objectsGeometry) {
                    var guids = [];

//                    this.clearLayers();
                    for (var i = 0, count = objectsGeometry.features.length; i < count; i++) {
                        var objectProps = objectsGeometry.features[i].properties,
                            object_guid = objectProps[this.options.fieldId];

                        if (this.layersById[object_guid]) {
                            continue;
                        }

                        guids.push(object_guid);
                        var markerLayer = this.addObject(objectsGeometry.features[i], 'state-wait', objectsGeometry.features[i].properties['SCADA_ID']);
                        this._markerLayerBindEvents(markerLayer, objectProps, 'state-wait');
                    }

                    if (this._ws) {
                        this._addNewObjsToSubsrcibe(guids);
                    }

                    deferred.resolve(guids);
                }));

            return deferred.promise;
        },

        _ws: null,
        _subscribeObjectStatuses: function (guidsObjs) {
            var ws = new WebSocket(scadaWebSockectUrl),
                guids = guidsObjs || obj.keys(this.layersById).join(',');

            this._ws = ws;

            ws.onmessage = lang.hitch(this, function (e) {
                try {
                    var result = JSON.parse(e.data),
                        objs = result.objs,
                        obj, id;

                    for (var i = 0, l = objs.length; i < l; i++) {
                        obj = objs[i];
                        id = obj.id;
                        array.forEach(obj.attrs, function (attr) {
                            if (attr.name === 'Cod') {
                                this._changeStyle(id, 'state-' + attr.value);
                            }
                        }, this);
                    }

                } catch (err) {

                }
            });

            ws.onopen = lang.hitch(this, function () {
                if (this.options.debug) console.log('opening...');
                ws.send('GET_NEW ' + guids);
            });

            ws.onerror = function (error) {
                if (this.options.debug) console.log('WEbSocket error ' + error);
                if (this.options.debug) console.dir(error);
            };
        },

        _addNewObjsToSubsrcibe: function (guids) {
            if (guids.length > 0) {
                this._ws.send('GET_OBJ ' + guids);
            }
        }
    });
});