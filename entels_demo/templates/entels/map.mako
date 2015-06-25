<%inherit file="../_master_materialize.mako"/>

<div class="row">
    <div class="section col s12 m9 l10">
        <div id="nav_demo" class="row scrollspy">
            <div class="row">
                <h3 class="col s12 header">Демо</h3>
            </div>
            <div class="row">
                <div id="map">
                    <p class="loaded-status">Построение демо-карты...</p>
                    <%include file="../_languages.mako"/>
                </div>
                <p><a href="${request.route_url('entels_map_full', lang='ru')}">Открыть на весь экран &rarr;</a></p>
            </div>
            <div id="nav_source_code" class="row scrollspy">
                <div class="row">
                    <h3 class="col s12 header">Пример кода</h3>
                </div>
                <div class="row">
                <pre data-src="${request.static_url('entels_demo:static/js/pages/entels_map.js')}"
                     class="line-numbers">
                </pre>
                </div>
            </div>
        </div>
    </div>
</div>

<%block name="inlineScripts">
    <script src="${request.static_url('entels_demo:static/js/pages/entels_map.js')}"></script>
</%block>