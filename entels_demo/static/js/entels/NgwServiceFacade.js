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

            getResourceInfo: function (idResource) {
                var url = 'resource/' + idResource + '/child/';

                return xhr(this._ngwUrlBase + url, {
                    handleAs: 'json',
                    method: 'GET'
                });
            }
        });
    });