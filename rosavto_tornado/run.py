import argparse

from sqlalchemy import engine_from_config
from pyramid.paster import get_appsettings, setup_logging
import tornado.web

from rosavto_tornado import DBSession, app


parser = argparse.ArgumentParser()
parser.add_argument('ini_config', help='path to .ini config')
args = parser.parse_args()

if args.ini_config:
    config_uri = args.ini_config
    setup_logging(config_uri)
    settings = get_appsettings(config_uri)
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    app.listen(settings['tornado.port'])
    tornado.ioloop.IOLoop.instance().start()
else:
    raise 'path to .ini config parameter (--conf) is required'