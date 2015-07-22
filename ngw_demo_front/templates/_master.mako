<!DOCTYPE html>
<html>
    <%def name="title()">
        <%
            import ngw_demo_front.navigation as navigation
        %>
        ${navigation.get_page_config(request.matched_route.name)['title']}
    </%def>
<head>
    <title>${title()}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>

    <link rel="icon" type="image/png" href="${request.static_url('ngw_demo_front:static/nextgis-favicon-16_16.png')}">

    <link type="text/css" rel="stylesheet"
          href="${request.static_url('ngw_demo_front:static/contrib/materialize/css/customize.css')}"/>
    <link rel="stylesheet" href="${request.static_url('ngw_demo_front:static/js/leaflet/leaflet.css')}"/>
    <link rel="stylesheet" href="${request.static_url('ngw_demo_front:static/css/widget.css')}"/>
    <link rel="stylesheet" href="${request.static_url('ngw_demo_front:static/css/main.css')}"/>
</head>
<body id="NxgDemo">
    ##    <%include file='_navigation.mako'/>

<main>
    <div class="section" id="index-banner">
        <div class="container">
            <div class="row">
                <div class="col s12 m9">
                    <h1 class="light indigo-text text-lighten-4 center-on-small-only">Демонстрация виджетов к системе
                        NextGIS Web.</h1>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        ${self.body()}
    </div>

</main>
<footer class="page-footer">
    <div class="footer-copyright">
        <div class="container">
            © 2014-2015 NextGIS, All rights reserved.
            <a class="grey-text text-lighten-4 right" href="https://github.com/Dogfalo/materialize/blob/master/LICENSE">MIT
                License</a>
        </div>
    </div>
</footer>
</body>

<script src="${request.static_url('ngw_demo_front:static/contrib/prismjs/prism.js')}"></script>

<script type="text/javascript"
        src="${request.static_url('ngw_demo_front:static/contrib/jquery/jquery-2.1.3.min.js')}"></script>
<script type="text/javascript"
        src="${request.static_url('ngw_demo_front:static/contrib/materialize/js/materialize.min.js')}"></script>
<script type="text/javascript"
        src="${request.static_url('ngw_demo_front:static/contrib/materialize/js/init.js')}"></script>

<script>
    var application_root = '${request.application_url}',
            ngwUrlForTiles = '${request.registry.settings['proxy_ngw']}',
            ngwProxyUrl = application_root + '/ngw/',
##            Monitoring = {
##                url: '${request.registry.settings['proxy_cit']}monitoring-web',
##                contextPath: '${request.registry.settings['proxy_cit']}monitoring-web/',
##                getApplication: function () {
##                    return {
##                        fireEvent: function (event, featureId, histDate) {
##                            console.log('Monitoring event was fired.');
##                        }
##                    }
##                }
##
##            },
            dojoConfig = {
                isDebug: true,
                async: true,
                cacheBust: true,
                baseUrl: "${request.static_url('ngw_demo_front:static')}",
                packages: [
                    {name: "ngw_demo_front", location: 'js/ngw_demo_front'},
                    {name: "proj4js", location: 'contrib/proj4js'},
                    {name: "mustache", location: 'contrib/mustache'},
                    {name: 'leaflet', location: 'contrib/leaflet'},
                    {name: 'centreit', location: 'js/centreit'},
                    {name: 'stomp', location: 'contrib/stomp'},
                    {name: 'sockjs', location: 'contrib/sockjs'}
                ],
                has: {
                    "dojo-firebug": true,
                    "dojo-debug-messages": true
                }
            };
</script>

<script src="//ajax.googleapis.com/ajax/libs/dojo/1.9.7/dojo/dojo.js"></script>
<script src="${request.static_url('ngw_demo_front:static/js/sockjs/sockjs.js')}"></script>
<script src="${request.static_url('ngw_demo_front:static/js/stomp/stomp.js')}"></script>
<script src="${request.static_url('ngw_demo_front:static/js/centreit/MonitoringCard.js')}"></script>
    <%block name="inlineScripts"/>
</html>