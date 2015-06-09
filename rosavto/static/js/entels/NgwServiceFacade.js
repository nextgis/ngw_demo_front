define([
        'dojo/_base/declare',
        'dojo/_base/lang',
        'dojo/request/xhr',
        'dojox/encoding/base64'
    ],
    function (declare, lang, xhr, base64) {
        return declare('entels.NgwServiceFacade', null, {
            constructor: function (ngwUrlBase, settings) {
                this._ngwUrlBase = ngwUrlBase;

                lang.mixin(this, settings);
            },

            getGeometryByGuid: function (layerId, featureGuid, srs) {
                var url = 'geocollection/rosavto?layers=' + layerId + '&guids=' + featureGuid;

                if (srs) {
                    url += '&srs=' + srs;
                }

                return xhr(this._ngwUrlBase + url, {handleAs: 'json', method: 'GET'});
            },

            getGeometriesByGuids: function (layersId, guids, datetime) {
                var url = 'geocollection/rosavto',
                    params = {};

                params.datetime = datetime ? this.formatDateTime(datetime) : this.formatDateTime(new Date());
                params.guids = guids.join(',');

                if (layersId) {
                    params.layers = layersId.join(',');
                }

                return xhr(this._ngwUrlBase + url, {
                    handleAs: 'json',
                    method: 'GET',
                    query: params
                });
            },

            identifyFeaturesByLayers: function (layersIds, wktBounds, srs) {
                var url = 'geocollection/rosavto?',
                    params;

                if (!srs) {
                    srs = 4326;
                }

                params = {
                    layers: layersIds.join(','),
                    srs: srs,
                    bbox: wktBounds.join(',')
                };

                return xhr(this._ngwUrlBase + url, {
                    handleAs: 'json',
                    method: 'GET',
                    query: params
                });
            },


            identifyGeoFeaturesByLayers: function (layers, zoom, latlng, tolerance, datetime) {
                if (!tolerance) {
                    tolerance = 10;
                }

                datetime = datetime ? this.formatDateTime(datetime) : this.formatDateTime(new Date());

                return xhr(this._ngwUrlBase + 'geocollection/rosavto', {
                    handleAs: 'json',
                    method: 'GET',
                    query: {
                        layers: layers.join(','),
                        zoom: zoom,
                        tolerance: tolerance,
                        datetime: datetime,
                        point: latlng.join(',')
                    }
                });
            },

            formatDateTime: function (dateTime) {
                return dateTime.toISOString();
            },

            getResourceInfo: function (idResource) {
                var url = 'resource/' + idResource + '/child/';

                return xhr(this._ngwUrlBase + url, {
                    handleAs: 'json',
                    method: 'GET'
                });
            },

            getObjectsFromLayer: function (layerId) {
                var url = 'resource/' + layerId + '/store/';
                return xhr(this._ngwUrlBase + url, {handleAs: 'json', method: 'GET'});
            }
        });
    });