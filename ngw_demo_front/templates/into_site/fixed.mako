<% import ngw_demo_front.navigation as navigation %>

<%inherit file="../_master.mako"/>

<%block name="inlineCss">
    <style>
        #load {
            color: gray;
        }

        iframe {
            width: 100%;
            border: none;
            display: none;
        }
    </style>
</%block>

<div class="row">
    <div class="section col s12 m9 l10">
        <div id="nav_description" class="row scrollspy">
            <div class="row">
                <h2 class="col s12 header">${parent.title()}</h2>
            </div>
            <div class="row">
                <p>Демонстрируется интеграция виджета карты в страницу с жестко фиксированным типом макета на примере
                    страницы <a
                            href="http://moacadem.ru/index">официального сайта Муниципального округа Академический</a>.
                </p>

                <p>Для примера отображения слоев используется экземпляр NextGIS Web Муниципалитет, расположенный по
                    этому <a href="http://176.9.38.120/demo/">адресу</a>.</p>

                <p>Для отображения примера используется технология iframe. Пример можно открыть в отдельном окне по
                    этому <a href="${request.route_url('into_fixed_site_content')}">адресу</a>.
                </p>
            </div>
        </div>
        <div id="nav_demo" class="row scrollspy">
            <div class="row">
                <div id="load">Построение страницы примера...</div>
                <iframe id="frameContent" src="${request.route_url('into_fixed_site_content')}"
                        onLoad="autoResize('frameContent');"></iframe>
            </div>
        </div>
    </div>
</div>

<%block name="inlineScripts">
    ##    <script src="${request.static_url('ngw_demo_front:static/js/pages/' + request.matched_route.name + '.js')}"></script>

    <script language="JavaScript">
        <!--
        function autoResize(id) {
            var frame = document.getElementById(id),
                    load = document.getElementById("load"),
                    newheight,
                    newwidth;

            if (document.getElementById) {
                newheight = frame.contentWindow.document.body.scrollHeight;
                newwidth = frame.contentWindow.document.body.scrollWidth;
            }

            frame.height = (newheight) + "px";
            frame.width = (newwidth) + "px";

            frame.style.display = "block";
            load.style.display = "none";
        }
        //-->
    </script>
</%block>