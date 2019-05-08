import eventlet
eventlet.monkey_patch()

import os

from flask import Flask, render_template
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy, models_committed
from flask_socketio import SocketIO

# Create app and initialize base config
app = Flask(__name__)
app.config.from_pyfile('config.py')

# Merge in config from instance/config.py
instance_config_path = os.path.join(os.path.dirname(__file__), '..', 'instance', 'config.py')
if os.path.isfile(instance_config_path):
    app.config.from_pyfile(instance_config_path)

# Initialize extensions
db = SQLAlchemy(app)
rest = Api(app)
socketio = SocketIO(app)

# Load model and view definitions
from . import models
from . import views

# Define root route for frontend
@app.route('/')
@app.route('/items')
@app.route('/events')
def index():
    return render_template('index.html')

# Register a signal handler that will issue socketio events when database changes occur
def on_models_committed(app_, changes):
    for obj, operation in changes:
        payload = obj.id if operation == 'delete' else obj.serialize()
        event = '%s %s' % (obj.__tablename__, operation)
        socketio.emit(event, payload)

models_committed.connect(on_models_committed, app)
