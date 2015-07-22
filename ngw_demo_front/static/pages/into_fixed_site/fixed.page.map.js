require([
        // Модуль карты
        'ngw_demo_front/Map',
        // Модуль для заполнения информации о слоях
        'ngw_demo_front/LayersInfo',
        // Модуль фасада к сервисам NGW
        'ngw_demo_front/NgwServiceFacade',
        'dojo/domReady!'],

    function (Map, LayersInfo, NgwServiceFacade) {
        // Создаем и конфигурируем фасад к сервисам NGW
        var ngwServiceFacade = new NgwServiceFacade(ngwProxyUrl),
            // Создаем и конфигурируем карту
            map = new Map('map', {
                center: [55.8252, 37.3167],
                zoom: 16,
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

            // Подключаем базовые слои подложки с NGW
            map.addOsmTileLayer();

            // Получаем словарь стилей слоев по ключевым значениями слоя
            //var layersByKeyname = layersInfo.getLayersDictByKeyname();

            // Добавляем нужные нам слои на карту
            map.addNgwTileLayer('Дороги', ngwUrlForTiles, 3, null);
            map.addNgwTileLayer('Границы Красногорска', ngwUrlForTiles, 8, null);
            map.addNgwTileLayer('Детские площадки', ngwUrlForTiles, 6, null);


            map.addNgwTileLayer('Карта проблем', ngwUrlForTiles, 146, null);
            map.addNgwTileLayer('Территории запрет торговли алкоголя', ngwUrlForTiles, 148, null);
            //map.addNgwTileLayerWithKeyname('roads', 'Сеть федеральных дорог', ngwUrlForTiles, layersByKeyname['roads'].style_id, null);
            //map.addNgwTileLayerWithKeyname('roads_regional', 'Сеть региональных дорог', ngwUrlForTiles, layersByKeyname['roads_regional'].style_id, null);

            // Скрываем иконку загрузки
            map.hideLoader();
        });
    });