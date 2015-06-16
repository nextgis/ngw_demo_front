require([
        // Модуль карты
        'entels/Map',
        // Модуль для заполнения информации о слоях
        'entels/LayersInfo',
        // Модуль фасада к сервисам NGW
        'entels/NgwServiceFacade',
        // Модуль фасада к сервисам Scada
        'entels/ScadaServiceFacade',
        'entels/ObjectsLayer',
        'entels/_mocks',
        'dojo/domReady!'],

    function (Map, LayersInfo, NgwServiceFacade, ScadaServiceFacade, ObjectsLayer, _mocks) {
        // Создаем и конфигурируем фасад к сервисам NGW
        var ngwServiceFacade = new NgwServiceFacade(proxyNgwUrl),
            scadaServiceFacade = new ScadaServiceFacade(proxyScadaUrl),
        // Создаем и конфигурируем карту
            map = new Map('map', {
                center: [55.529, 37.584],
                zoom: 7,
                zoomControl: true,
                legend: true,
                easyPrint: false
            }),
            layersInfo;

        // Инициализируем хранилище информации о слоях
        layersInfo = new LayersInfo(ngwServiceFacade);

        // Отображаем иконку загрузки
        map.showLoader();

        // Заполняем рекурсивно хранилище информации о слоях LayersInfo
        layersInfo.fillLayersInfo().then(function (store) {
            // Подключаем подложку Openstreetmap
            map.addOsmTileLayer();

            var l = new ObjectsLayer(null, {
                ngwServiceFacade: ngwServiceFacade,
                layersInfo: layersInfo,
                map: map,
                layerKeyname: 'objects',
                fieldId: 'SCADA_ID',
                typeFieldName: '',
                styles: {
                    'state-wait': {
                        point: {type: 'div', className: 'state-wait', iconSize: [24, 24]}
                    },
                    'state-0': {
                        point: {type: 'div', className: 'state-0', iconSize: [24, 24]}
                    },
                    'state-1': {
                        point: {type: 'div', className: 'state-1', iconSize: [24, 24]}
                    },
                    'state-2': {
                        point: {type: 'div', className: 'state-2', iconSize: [24, 24]}
                    },
                    'state-3': {
                        point: {type: 'div', className: 'state-3', iconSize: [24, 24]}
                    },
                    'state-4': {
                        point: {type: 'div', className: 'state-4', iconSize: [24, 24]}
                    },
                    'state-5': {
                        point: {type: 'div', className: 'state-5', iconSize: [24, 24]}
                    }
                },
                scadaServiceFacade: scadaServiceFacade,

                debug: true
            });
            map.addVectorLayer(l, 'Объекты');


            // Скрываем иконку загрузки
            map.hideLoader();
        });
    });