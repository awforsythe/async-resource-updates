import os

rootdir = os.path.normpath(os.path.join(os.path.dirname(__file__), '..'))

DEBUG = True
SQLALCHEMY_DATABASE_URI = 'sqlite:///%s' % os.path.join(rootdir, 'test.db')
SQLALCHEMY_TRACK_MODIFICATIONS = True
