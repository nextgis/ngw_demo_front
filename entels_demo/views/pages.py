from pyramid.view import view_config


@view_config(route_name='entels_map_default', renderer='entels/map.mako')
@view_config(route_name='entels_map', renderer='entels/map.mako')
def entels_map(request, lang='ru'):
    if 'lang' in request.matchdict:
        lang = request.matchdict['lang']
    return {
        'lang': lang
    }


@view_config(route_name='entels_map_full', renderer='entels/map_full_screen.mako')
def map_full_screen(request):
    lang = request.matchdict['lang']
    return {
        'lang': lang
    }
