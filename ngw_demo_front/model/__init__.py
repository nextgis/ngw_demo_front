from utilites import DictionaryMixin, GeoJsonMixin

from sqlalchemy import (
    Column,
    Index,
    Integer,
    BigInteger,
    Text,
    Boolean
    )
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import (
    scoped_session,
    sessionmaker,
    )
from zope.sqlalchemy import ZopeTransactionExtension

from geoalchemy2 import Geometry, shape

from shapely.geometry import asShape

import json
import geojson

DBSession = scoped_session(sessionmaker(extension=ZopeTransactionExtension()))
Base = declarative_base()