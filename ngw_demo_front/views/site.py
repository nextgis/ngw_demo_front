import urllib
import urllib2
import ast
import json

import random
import os.path as path

from pyramid.view import view_config


@view_config(route_name='into_fixed_site', renderer='into_site/fixed.mako')
def into_fixed_site(request):
    return {}


@view_config(route_name='into_fixed_site_content', renderer='into_site/fixed_content.mako')
def into_fixed_site_content(request):
    return {}