import json
from sqlalchemy.sql import select, text
from sqlalchemy.exc import InternalError
from sqlalchemy import func
from geoalchemy2.elements import WKTElement
from pyramid.view import view_config
from shapely.geometry import Point

from rosavto.model import DBSession
from rosavto.model.way import Way


@view_config(route_name='entels_attr', renderer='json')
def get_attributes(request):
    id = request.GET['obj']
    return {
        'id': id,
        'attrs': [
            {'name': 'test_' + id, 'value': 'attribute_value', 'type': 'text'},
            {'name': 'test', 'value': 'attribute_value', 'type': 'text'},
            {'name': 'attribute_name', 'value': 'attribute_value', 'type': 'url'},
            {'name': 'attribute_name', 'value': 'attribute_value', 'type': 'image'},
            {'name': 'attribute_name', 'value': 'attribute_value', 'type': 'image'}
        ]
    }
