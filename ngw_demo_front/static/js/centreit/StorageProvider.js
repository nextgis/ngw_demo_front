/* Т.к. загрузка асинхронная, после подключения dojo.js объектов dojo и dojox не существует, приходится использовать оставленную возможность для модулей, не переписанных под dojo-AMD */
define(['dojo',
    'dojox',
    'dojo/request/script',
    'dojo/Deferred'
], function (dojo, dojox, script, Deferred) {
    var storage = new Deferred();
    script.get('http://ajax.googleapis.com/ajax/libs/dojo/1.9.7/dojox/storage/Provider.js')
        .then(function () {
            script.get('http://ajax.googleapis.com/ajax/libs/dojo/1.9.7/dojox/storage/manager.js')
                .then(function () {
                    script.get('http://ajax.googleapis.com/ajax/libs/dojo/1.9.7/dojox/storage/LocalStorageProvider.js')
                        .then(function () {
                            script.get('http://ajax.googleapis.com/ajax/libs/dojo/1.9.7/dojox/storage/CookieStorageProvider.js')
                                .then(function () {
                                    var storageProvider;
                                    if (dojox.storage && dojox.storage.manager) {
                                        dojox.storage.manager.initialize();
                                        dojox.storage.manager.getProvider();
                                        storageProvider.initialize();
                                        storage.resolve(storageProvider);
                                    }
                                });
                        });
                });
        });
    return storage.promise;
});