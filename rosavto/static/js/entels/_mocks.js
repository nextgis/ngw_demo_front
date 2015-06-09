define([
        'dojo/_base/declare',
        'dojo/Deferred'
    ],
    function (declare, Deferred) {
        return {
            ngwFacadeGetObjects: function (ngwServiceFacade) {
                ngwServiceFacade.identifyFeaturesByLayers = function () {
                    var deferred = new Deferred();

                    setTimeout(function () {
                        var result = {
                            'crs': {'type': 'name', 'properties': {'name': 'EPSG:3857'}},
                            'type': 'FeatureCollection',
                            'features': [{
                                'geometry': {
                                    'type': 'MultiPoint',
                                    'coordinates': [[37.7, 55.5]]
                                },
                                'type': 'Feature',
                                'properties': {
                                    'type': 0,
                                    'SCADA_ID': 'CHL1028',
                                    'name': 'CHL1028',
                                    'desc': 'Булатниково'
                                },
                                'id': 1
                            },
                            {
                                'geometry': {
                                    'type': 'MultiPoint',
                                    'coordinates': [[37.9, 55.5]]
                                },
                                'type': 'Feature',
                                'properties': {
                                    'type': 0,
                                    'SCADA_ID': 'CHL1026',
                                    'name': 'CHL1026',
                                    'desc': 'Булатниково'},
                                'id': 2
                            },
                            {
                                'geometry': {
                                    'type': 'MultiPoint',
                                    'coordinates': [[38.5, 55.5]]
                                },
                                'type': 'Feature',
                                'properties': {
                                    'type': 0,
                                    'SCADA_ID': 'CHL1025',
                                    'name': 'CHL1026',
                                    'desc': 'Булатниково'},
                                'id': 3
                            }]
                        };

                        deferred.resolve(result);
                    }, 1000);

                    return deferred.promise;
                };
            }
        };
    });