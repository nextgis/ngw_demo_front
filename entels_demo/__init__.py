from pyramid.config import Configurator


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    config = Configurator(settings=settings)
    config.include('pyramid_mako')
    config.include("cornice")
    config.add_static_view('static', 'static', cache_max_age=3600)

    config.add_route('entels_map_default', '/')
    config.add_route('entels_map', '/{lang}/')
    config.add_route('entels_map_full', '/full/{lang}/')

    config.scan()
    return config.make_wsgi_app()