from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import (
    scoped_session,
    sessionmaker,
    )
from zope.sqlalchemy import ZopeTransactionExtension

import tornado.web
from handlers.index import IndexHandler
from handlers.sensors import SensorsHandler

import logging
logging.getLogger().setLevel(logging.DEBUG)

app = tornado.web.Application([
    (r'/', IndexHandler),
    (r'/sensors', SensorsHandler)
])

DBSession = scoped_session(sessionmaker(extension=ZopeTransactionExtension()))
Base = declarative_base()