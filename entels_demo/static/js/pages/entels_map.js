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
        'entels/ExeRunner',
        'pages/entels_map/' + application_lang,
        'dojo/domReady!'],
    function (Map, LayersInfo, NgwServiceFacade, ScadaServiceFacade, ObjectsLayer, exeRunner, translates) {
            // Создаем и конфигурируем фасад к сервисам NGW
        var ngwServiceFacade = new NgwServiceFacade(proxyNgwUrl),
            // Задаем фасад к сервисам Scada
            scadaServiceFacade = new ScadaServiceFacade(proxyScadaUrl),
            // Создаем и конфигурируем карту
            map = new Map('map', {
                center: [55.529, 37.584],
                zoom: 7,
                zoomControl: true,
                legend: false,
                easyPrint: false
            }),
            layersInfo;

        new exeRunner().activate();

        // Инициализируем хранилище информации о слоях
        layersInfo = new LayersInfo(ngwServiceFacade);

        // Отображаем иконку загрузки
        map.showLoader();

        // Заполняем рекурсивно хранилище информации о слоях LayersInfo
        layersInfo.fillLayersInfo().then(function (store) {

            // Подключаем подложку Openstreetmap
            map.addTileLayer('OSM', 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

            // Создаем слой объектов
            var l = new ObjectsLayer(null, {
                // Задаем фасад к сервиса NGW
                ngwServiceFacade: ngwServiceFacade,
                // Задаем фасад к сервисам Scada
                scadaServiceFacade: scadaServiceFacade,
                // Задаем ссылку на заполненный объект с
                // информацией о слоях
                layersInfo: layersInfo,
                // Ссылка на карту
                map: map,
                // keyname слоя в NGW
                layerKeyname: 'objects',
                // Название атрибута, отвечающего за
                // идентификацию объектов
                fieldId: 'SCADA_ID',
                // Перечень возможный состояний
                // Название состояния идет после state-
                states: {
                    'wait': translates['wait'],
                    '0': null,
                    '1': translates['1'],
                    '2': translates['2'],
                    '3': translates['3'],
                    '4': translates['4'],
                    '5': translates['5']
                },
                styles: {
                    'wait': {
                        point: {type: 'div', className: 'state-wait', iconSize: [24, 24]}
                    },
                    '0': {
                        point: {type: 'div', className: 'state-0', iconSize: [24, 24]}
                    },
                    '1': {
                        point: {type: 'div', className: 'state-1', iconSize: [24, 24]}
                    },
                    '2': {
                        point: {type: 'div', className: 'state-2', iconSize: [24, 24]}
                    },
                    '3': {
                        point: {type: 'div', className: 'state-3', iconSize: [24, 24]}
                    },
                    '4': {
                        point: {type: 'div', className: 'state-4', iconSize: [24, 24]}
                    },
                    '5': {
                        point: {type: 'div', className: 'state-5', iconSize: [24, 24]}
                    }
                },
                // Сообщение в попапе
                // при ошибке соединения
                // со SCADA сервисом атрибутов
                popupErrorMessage: translates.popupErrorMessage,
                // Сообщение в случае, когда
                // браузер не поддерживает WS
                wsSupportErrorMessage: translates.wsSupportErrorMessage,
                debug: true
            });

            map.addVectorLayer(l, 'Объекты');

            // Скрываем иконку загрузки
            map.hideLoader();
        });
    });