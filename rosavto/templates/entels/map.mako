<%inherit file="../_master.mako"/>

<%block name="css">
    <link rel="stylesheet" href="${request.static_url('rosavto:static/css/entels/objects-icons.css')}"/>
    <link rel="stylesheet" href="${request.static_url('rosavto:static/css/entels/styles.css')}"/>
    <link rel="stylesheet"
          href="${request.static_url('rosavto:static/js/leaflet/leaflet.tooltip/leaflet.tooltip.css')}"/>
</%block>

<div class="row">
    <div class="section col s12 m9 l10">
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
    </div>
</div>


<%block name="inlineScripts">
    <script>
        var tornado_root_url = '${request.registry.settings['tornado.port']}';
    </script>
    <script src="${request.static_url('rosavto:static/js/pages/' + request.matched_route.name + '.js')}"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
</%block>