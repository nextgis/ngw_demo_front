<%inherit file="../_master.mako"/>

<%block name="html_attrs">class="full-screen"</%block>

<%block name="content">
    <div id="map">
        <p class="loaded-status">Построение демо-карты...</p>
        <%include file="../_languages.mako"/>
    </div>
</%block>


<%block name="inlineScripts">
    <script src="${request.static_url('entels_demo:static/js/pages/entels_map.js')}"></script>
</%block>