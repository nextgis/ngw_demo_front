<% import ngw_demo_front.navigation as navigation %>

<%inherit file="_master.mako"/>

<div class="row">
    <div class="section col s12 m9 l10">
        <div id="nav_description" class="row scrollspy">
            <div class="row">
                <h2 class="col s12 header">${parent.title()}</h2>
            </div>
            <div class="row">
                <p>Демонстрация подключения тайловых слоев, которыми управляет NextGIS Web. Список слоев получается из
                    NextGIS Web.</p>
            </div>
        </div>
        <div id="nav_demo" class="row scrollspy">
            <div class="row">
                <h3 class="col s12 header">Демо</h3>
            </div>
            <div class="row">
                <div id="map">
                    <p class="loaded-status">Построение демо-карты...</p>
                </div>
            </div>
        </div>
        <div id="nav_source_code" class="row scrollspy">
            <div class="row">
                <h3 class="col s12 header">Пример кода</h3>
            </div>
            <div class="row">
                <pre data-src="${request.static_url('ngw_demo_front:static/js/pages/' + request.matched_route.name + '.js')}"
                     class="line-numbers">
                </pre>
            </div>
        </div>
    </div>
</div>

<%block name="inlineScripts">
    <script src="${request.static_url('ngw_demo_front:static/js/pages/' + request.matched_route.name + '.js')}"></script>
</%block>