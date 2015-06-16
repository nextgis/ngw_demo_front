from pyramid.view import view_config


@view_config(route_name='entels_map', renderer='entels/map.mako')
def entels_map(request):
    return {}


@view_config(route_name='entels_map_full', renderer='entels/map_full_screen.mako')
def map_full_screen(request):
    return {}
