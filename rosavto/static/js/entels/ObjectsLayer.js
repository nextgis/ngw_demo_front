define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/request/xhr',
    'dijit/Tooltip',
    'entels/StyledGeoJsonLayer',
    'entels/ParametersVerification',
    'mustache/mustache',
    'dojo/text!entels/templates/Tooltip.html',
    'dojo/text!entels/templates/AttributesPopup.html'
], function (declare, lang, array, xhr, Tooltip, StyledGeoJsonLayer,
             ParametersVerification, mustache, Tooltip, AttributesPopup) {
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

        onAdd: function (map) {
            StyledGeoJsonLayer.prototype.onAdd.call(this, map);
            this._hookMap(map);
            this._buildObjects();
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

        _buildObjects: function () {
            var bounds = this.options.map.getLMap().getBounds(),
                bounds3857 = {
                    _southWest: L.CRS.EPSG3857.project(bounds._southWest),
                    _northEast: L.CRS.EPSG3857.project(bounds._northEast)
                },
                extent3857 = [bounds3857._southWest.x, bounds3857._southWest.y, bounds3857._northEast.x, bounds3857._northEast.y];

            this.clearLayers();
            this.options.ngwServiceFacade.identifyFeaturesByLayers([this._objects_layer_id], extent3857, 3857)
                .then(lang.hitch(this, function (objectsGeometry) {
                    var guids = [];

                    var styles = this.options.styles;
                    for (var i = 0, count = objectsGeometry.features.length; i < count; i++) {
                        guids.push(objectsGeometry.features[i].id);
                        var markerLayer = this.addObject(objectsGeometry.features[i], 'wait', objectsGeometry.features[i].id);

                        if (styles['wait'].tooltip) {
                            var markers = this.getMarkers(markerLayer);
                            var lmap = this.options.map._lmap;
                            var objectProps = objectsGeometry.features[i].properties;
                            objectProps.status = 'Ожидаем связь...';
                            array.forEach(markers, function (marker) {
                                L.tooltip({
                                    target: marker,
                                    map: lmap,
                                    html: mustache.render(Tooltip, objectProps)
                                });
                                marker._id = objectProps[this.options.fieldId];
                                marker.on('click', lang.hitch(this, function (markerClicked) {
                                    this.options.scadaServiceFacade.getAttributesById(markerClicked.target._id)
                                        .then(lang.hitch(this, function (result) {
                                            lmap.openPopup(mustache.render(AttributesPopup, result), markerClicked.latlng);
                                        }));
                                    }));
                            }, this);
                        }
                    }

                    //xhr(this.options.getRepairsStatusUrl, {
                    //    handleAs: 'json',
                    //    method: 'POST',
                    //    data: {
                    //        guids: guids.join(','),
                    //        time: this.options.getCurrentTime.call(undefined)
                    //    }
                    //}).then(lang.hitch(this, function (repairsStatuses) {
                    //    var guid;
                    //    for (var i = 0, count = objectsGeometry.features.length; i < count; i++) {
                    //        guid = objectsGeometry.features[i].properties.uniq_uid;
                    //        if (repairsStatuses[guid]) {
                    //            this.addObject(objectsGeometry.features[i], repairsStatuses[guid].status, guid);
                    //        } else {
                    //            if (this.options.debug) {
                    //                console.log('RepairsLayer: object with guid "' + guid + '" has no status.');
                    //            }
                    //        }
                    //
                    //    }
                    //}));
                }));
        }
    });
});