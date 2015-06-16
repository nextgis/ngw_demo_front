<%inherit file="_master.mako"/>

<%block name="content">
    <main>
        <div class="section" id="index-banner">
            <div class="container">
                <div class="row">
                    <div class="col s12 m9">
                        <h1 class="header center-on-small-only">Демо-стенд</h1>
                        <h4 class="light indigo-text text-lighten-4 center-on-small-only">Демонстрация виджетов к
                            системе
                            NextGIS Web Entels.</h4>
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
            </div>
        </div>
    </footer>
</%block>