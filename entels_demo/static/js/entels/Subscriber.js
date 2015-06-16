define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    "dojo/on",
    'entels/StompClient',
    'dojox/lang/functional/object',
    'dojox/uuid/_base',
    'dojox/uuid/generateRandomUuid',
    'entels/ParametersVerification'
], function (declare, lang, on, StompClient, object, uuid, generateRandomUuid, ParametersVerification) {
    return declare('entels.Subscriber', [ParametersVerification], {
        _debug: false,

        constructor: function (settings) {
            this.verificateRequiredParameters(settings, [
                'subscribeUrl',
                'getHeaders',
                'parseMessage'
            ]);
            lang.mixin(this, settings);
        },

        _subscription: null,
        subscribe: function () {
            var that = this;
            that.unsubscribe();
            StompClient.connect().then(lang.hitch(this, function (client) {
                that._subscription = client.subscribe(
                        that.subscribeUrl + uuid.generateRandomUuid(),
                    lang.hitch(this, that.parseMessage),
                    that.getHeaders(that)
                );
            }));
        },

        unsubscribe: function () {
            if (this._subscription) {
                this._subscription.unsubscribe();
                this._subscription = null;
            }
        }

    });
});