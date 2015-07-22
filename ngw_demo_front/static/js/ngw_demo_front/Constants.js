define(['dojo/_base/declare'],
    function (declare) {
        var Constants = declare('ngw_demo_front.Constants', [], {
            RealtimeLayer: 'Rl',
            SensorsLayer: 'Sl',
            TileLayer: 'Tl'
        });

        if (!_instance) {
            var _instance = new Constants();
        }

        return _instance;
    });