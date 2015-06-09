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
        var ngwServiceFacade = new NgwServiceFacade('http://localhost/entels/ngw/'),
            scadaServiceFacade = new ScadaServiceFacade('http://localhost/entels/scada/'),
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

            // Получаем словарь стилей слоев по ключевым значениями слоя
            //var layersByKeyname = layersInfo.getLayersDictByKeyname();

            // Добавляем нужные нам слои на карту
            //map.addNgwTileLayerWithKeyname('objects', 'Объекты', 'http://localhost/entels/ngw/', layersByKeyname['objects'].style_id, null);

            //_mocks.ngwFacadeGetObjects(ngwServiceFacade);

            // Создаем слой ремонтов
            // Подключаем из rosavto/Layers/RepairsLayer
            var l = new ObjectsLayer(null, {
                ngwServiceFacade: ngwServiceFacade,
                layersInfo: layersInfo,
                map: map,
                layerKeyname: 'objects',
                fieldId: 'SCADA_ID',
                styles: {
                    'wait': {
                        point: {type: 'div', className: 'wait', iconSize: [24, 24]},
                        tooltip: '<b>Статус:</b> Ожидаем связи...',
                        line: {}
                    },
                    'no_connect': {
                        point: {type: 'div', className: 'no_connect'},
                        line: {}
                    },
                    'test': {
                        point: {'type': 'circle', 'radius': 3, 'style': {'opacity': 1, 'fillOpacity': 1, 'weight': 1, 'color': '#730000', 'fillColor': '#C92626'}},
                        line: {}
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