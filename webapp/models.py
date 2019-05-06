import datetime

from . import db


class Item(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    created_time = db.Column(db.DateTime, nullable=False)
    name = db.Column(db.Text, unique=True, nullable=False)
    description = db.Column(db.Text)
    weight = db.Column(db.Float)

    def serialize(self):
        return {
            'id': self.id,
            'created_time': self.created_time.isoformat(),
            'name': self.name,
            'description': self.description,
            'weight': self.weight,
        }

    @classmethod
    def new(cls, name, description=None, weight=None):
        now = datetime.datetime.utcnow()
        return cls(created_time=now, name=name, description=description, weight=weight)
