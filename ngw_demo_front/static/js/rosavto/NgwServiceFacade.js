define([
        'dojo/_base/declare',
        'dojo/_base/lang',
        'dojo/request/xhr'
    ],
    function (declare, lang, xhr) {
        return declare('ngw_demo_front.NgwServiceFacade', null, {
            constructor: function (ngwUrlBase, settings) {
                this._ngwUrlBase = ngwUrlBase;

                lang.mixin(this, settings);
            },

            getGeometryByGuid: function (layerId, featureGuid, srs) {
                var url = 'geocollection/ngw_demo_front?layers=' + layerId + '&guids=' + featureGuid;

                if (srs) {
                    url += '&srs=' + srs;
                }

                return xhr(this._ngwUrlBase + url, {handleAs: 'json', method: 'GET'});
            },

            getGeometriesByGuids: function (layersId, guids, datetime) {
                var url = 'geocollection/ngw_demo_front',
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
                var url = 'geocollection/ngw_demo_front?',
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

                return xhr(this._ngwUrlBase + 'geocollection/ngw_demo_front', {
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

                return xhr(this._ngwUrlBase + url, {handleAs: 'json', method: 'GET'});
            },

            getIncident: function (incidentPoints, srs) {
                var countsPoints = incidentPoints.length,
                    url,
                    point,
                    distance,
                    pointsParams,
                    i;

                if (!srs) {
                    srs = 4326;
                }

                if (countsPoints === 1) {
                    point = incidentPoints[0];

                    url = 'layer/' + point.layer + '/ngw_demo_front/getlrposbyuuid?guid=' + point.guid +
                        '&distance=' + this._calculateDistanceInMeters(point) +
                        '&srs=' + srs;

                    return xhr(this._ngwUrlBase + url, {handleAs: 'json', method: 'GET', data: {url: this._ngwUrlBase + url}});
                }

                if (countsPoints > 1) {
                    pointsParams = [];

                    for (i = 0; i < countsPoints; i += 1) {
                        pointsParams.push({
                            guid: incidentPoints[i].guid,
                            layer: incidentPoints[i].layer,
                            distance: this._calculateDistanceInMeters(incidentPoints[i])
                        });
                    }

                    url = 'layer/' + incidentPoints[0].layer + '/ngw_demo_front/getlrposbyuuid?srs=' + srs;
                    return xhr(this.proxy + url, {
                        handleAs: 'json',
                        method: 'POST',
                        data: {
                            url: this._ngwUrlBase + url,
                            params: JSON.stringify({points: pointsParams})
                        }
                    });
                }
            },

            _calculateDistanceInMeters: function (point) {
                var distance = 0;
                if (point.distance['km']) {
                    distance += point.distance['km'] * 1000;
                }
                if (point.distance['m']) {
                    distance += point.distance['m'];
                }
                return distance;
            },

            getIncidentLine: function (guid, pointStart, pointFinish, srs) {
                var url;

                if (!srs) {
                    srs = 4326;
                }

                url = 'layer/17/ngw_demo_front/getlrsublinebyuuid?guid=' + guid +
                    '&first=' + this._calculateDistanceInMeters(pointStart) +
                    '&last=' + this._calculateDistanceInMeters(pointFinish) +
                    '&step=1000' +
                    '&srs=' + srs;

                return xhr(this._ngwUrlBase + url, {handleAs: 'json', method: 'GET', data: {url: this._ngwUrlBase + url}});
            },

            getPointProjection: function (idLayer, guid, lat, lon) {
                var url = 'layer/' + idLayer + '/ngw_demo_front/getlrdistbyuuid?guid=' + guid +
                    '&lon=' + lon +
                    '&lat=' + lat;

                return xhr(this._ngwUrlBase + url, {handleAs: 'json', method: 'GET', data: {url: this._ngwUrlBase + url}});
            },

            getRouteByCoord: function (start_point, end_point, barrier_point) {
                var url = '/ngw_demo_front/getroute?from_x=' + start_point.lng + '&from_y=' + start_point.lat +
                    '&to_x=' + end_point.lng + '&to_y=' + end_point.lat;
                if (typeof barrier_point != 'undefined')
                    url += '&bar_x=' + barrier_point.lng + '&bar_y=' + barrier_point.lat;

                return xhr(this._ngwUrlBase + url, {handleAs: 'json', method: 'GET', data: {url: this._ngwUrlBase + url}});
            },

            getRouteByChainage: function (idLayer, guid, first, last) {
                var url = 'layer/' + idLayer + '/ngw_demo_front/getroutebychainage?guid=' + guid + '&first=' + first + '&last=' + last;
                return xhr(this._ngwUrlBase + url, {handleAs: 'json', method: 'GET', data: {url: this._ngwUrlBase + url}});
            },

            getWaySublineByChainage: function (idLayer, guid, first, last) {
                var url = 'layer/' + idLayer + '/ngw_demo_front/getlrsublinebyuuid?guid=' + guid +
                    '&first=' + first + '&last=' + last + '&step=1000';

                return xhr(this._ngwUrlBase + url, {handleAs: 'json', method: 'GET', data: {url: this._ngwUrlBase + url}});
            },

            getObjectsFromLayer: function (layerId) {
                var url = 'resource/' + layerId + '/store/';
                return xhr(this._ngwUrlBase + url, {handleAs: 'json', method: 'GET'});
            }
        });
    });