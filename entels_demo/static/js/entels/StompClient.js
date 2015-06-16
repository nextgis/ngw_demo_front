define([
        'dojo/topic',
        'dojo/_base/declare',
        'dojo/Deferred',
        'dojo/_base/lang',
        'dojox/lang/functional/object',
        'stomp/stomp',
        'sockjs/sockjs'
    ],
    function (topic, declare, Deferred, lang, object) {
        return {
            topic: topic,
            reconnectDelay: 1000,
            debug: false,
            deferred: null,
            client: null,

            connect: function () {
                if (!this.deferred) {
                    this.deferred = new Deferred();
                    this.reconnect();
                }
                return this.deferred;
            },

            reconnect: function () {
                var client = Stomp.over(new SockJS('http://localhost:6544/sockjs', null, {debug: this.debug}));
                if (!this.debug) {
                    client.debug = null;
                }
                client.connect('ngw', 'ngw', lang.hitch(this, function () {
                    this.internalClient.resubscribe(client);
                    this.deferred.resolve(this.internalClient);
                    topic.publish('connection/status', {
                        closed: false
                    });
                }), lang.hitch(this, function (error) {
                    console.warn('WebSocket connection failed: ' + error + '. Next attempt in ' + this.reconnectDelay + ' ms.');
                    topic.publish('connection/status', {
                        closed: true
                    });
                    setTimeout(lang.hitch(this, this.reconnect), this.reconnectDelay);
                }));
            },


            internalClient: {
                client: null,
                subscriptions: [],
                subscribe: function (destination, callback, headers) {
                    var result = this.client.subscribe(destination, callback, headers);
                    this.subscriptions[result.id] = {
                        destination: destination,
                        callback: callback,
                        headers: headers,
                        result: result
                    };
                    result.unsubscribe = lang.hitch(this, lang.partial(this.unsubscribe, result.id));
                    return result;
                },

                unsubscribe: function (id) {
                    delete this.subscriptions[id];
                    return this.client.unsubscribe(id);
                },

                resubscribe: function (client) {
                    var me = this;
                    if (me.client) {
                        object.forIn(this.subscriptions, function (subscription, id) {
                            me.client.unsubscribe(id);
                        });
                        me.client.disconnect();
                    }
                    me.client = client;
                    object.forIn(this.subscriptions, lang.hitch(this, function (subscription, id) {
                        if (subscription.headers) {
                            delete subscription.headers.id;
                        }
                        var newResult = this.client.subscribe(subscription.destination, subscription.callback,
                            subscription.headers === void(0) ? null : subscription.headers);
                        subscription.result.id = newResult.id;
                        subscription.result.unsubscribe = lang.hitch(me, lang.partial(me.unsubscribe, newResult.id));
                    }));
                }
            }
        };
    });
