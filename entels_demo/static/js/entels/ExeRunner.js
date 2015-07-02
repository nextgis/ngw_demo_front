define([
    'dojo/has',
    'dojo/_base/declare'
], function (has, declare) {
    return declare('entels.ExeRunner', [], {
        constructor: function () {
        },

        activate: function () {
            if (has('ie')) {
                window.runExe = function (exePath) {
                    var WshShell = new ActiveXObject('WScript.Shell');
                    WshShell.Run(exePath, 1, false);
                };
            } else if (has('ff')) {
                window.runExe = function (exePath) {
                    var file = Components.classes["@mozilla.org/file/local;1"]
                        .createInstance(Components.interfaces.nsILocalFile);
                    file.initWithPath(exePath);
                    file.launch();
                };
            }
        }
    });
});