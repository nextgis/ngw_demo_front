<!DOCTYPE html>
<html <%block name="html_attrs"/>>
<head>
    <title><%block name="title"/></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>

    <link rel="icon" type="image/png" href="${request.static_url('rosavto:static/nextgis-favicon-16_16.png')}">

    <link type="text/css" rel="stylesheet"
          href="${request.static_url('rosavto:static/contrib/materialize/css/customize.css')}"/>
    <link rel="stylesheet" href="${request.static_url('rosavto:static/js/leaflet/leaflet.css')}"/>
##    <link rel="stylesheet" href="${request.static_url('rosavto:static/css/widget.css')}"/>
##    <link rel="stylesheet" href="${request.static_url('rosavto:static/css/main.css')}"/>
    <link rel="stylesheet" href="${request.static_url('rosavto:static/contrib/prismjs/prism.css')}"/>
    <link rel="stylesheet" href="${request.static_url('rosavto:static/css/entels/objects-icons.css')}"/>
    <link rel="stylesheet" href="${request.static_url('rosavto:static/css/entels/styles.css')}"/>
    <link rel="stylesheet"
          href="${request.static_url('rosavto:static/js/leaflet/leaflet.tooltip/leaflet.tooltip.css')}"/>
    <%block name="css"/>
</head>
<body id="NxgDemo">
    <%block name="content"/>
</body>

<script src="${request.static_url('rosavto:static/contrib/prismjs/prism.js')}"></script>

<script type="text/javascript"
        src="${request.static_url('rosavto:static/contrib/jquery/jquery-2.1.3.min.js')}"></script>
<script type="text/javascript"
        src="${request.static_url('rosavto:static/contrib/materialize/js/materialize.min.js')}"></script>
<script type="text/javascript"
        src="${request.static_url('rosavto:static/contrib/materialize/js/init.js')}"></script>

<script>
    var application_root = '${request.application_url}',
            proxyNgwUrl = '${request.registry.settings['proxy_ngw']}',
            proxyScadaUrl = '${request.registry.settings['proxy_scada']}',
            dojoConfig = {
                isDebug: true,
                async: true,
                ##                cacheBust: true,
                                baseUrl: "${request.static_url('rosavto:static/js')}",
                packages: [
                    {name: "rosavto", location: 'rosavto'},
                    {name: "proj4js", location: 'proj4js'},
                    {name: "mustache", location: 'mustache'},
                    {name: 'leaflet', location: 'leaflet'},
                    {name: 'centreit', location: 'centreit'},
                    {name: 'stomp', location: 'stomp'},
                    {name: 'sockjs', location: 'sockjs'},
                    {name: 'entels', location: 'entels'}
                ],
                has: {
                    "dojo-firebug": true,
                    "dojo-debug-messages": true
                }
            };
</script>

<script src="//ajax.googleapis.com/ajax/libs/dojo/1.9.7/dojo/dojo.js"></script>
<script src="${request.static_url('rosavto:static/js/sockjs/sockjs.js')}"></script>
<script src="${request.static_url('rosavto:static/js/stomp/stomp.js')}"></script>
<script src="${request.static_url('rosavto:static/js/centreit/MonitoringCard.js')}"></script>
    <%block name="inlineScripts"/>
</html>