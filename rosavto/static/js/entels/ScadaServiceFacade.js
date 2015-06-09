define([
        'dojo/_base/declare',
        'dojo/_base/lang',
        'dojo/request/xhr'
    ],
    function (declare, lang, xhr) {
        return declare('entels.ScadaServiceFacade', null, {
            constructor: function (scadaUrlBase, settings) {
                this._scadaUrlBase = scadaUrlBase;
                lang.mixin(this, settings);
            },

            getAttributesById: function (id) {
                var url = 'obj/' + id;

                return xhr(this._scadaUrlBase + url, {
                    handleAs: 'json',
                    method: 'GET'
                });
            }
        });
    });