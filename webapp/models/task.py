import datetime

from .. import db


class Task(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    item_id = db.Column(db.Integer, db.ForeignKey('item.id'), nullable=False)
    started_time = db.Column(db.DateTime, nullable=False)
    finished_time = db.Column(db.DateTime)
    successful = db.Column(db.Boolean)
    progress_pct = db.Column(db.Float)
    message = db.Column(db.Text)

    def serialize(self):
        return {
            'id': self.id,
            'item_id': self.item_id,
            'started_time': self.started_time.isoformat(),
            'finished_time': self.finished_time.isoformat() if self.finished_time else None,
            'successful': self.successful,
            'progress_pct': self.progress_pct,
            'message': self.message,
        }

    @classmethod
    def new(cls, item, message=None):
        now = datetime.datetime.utcnow()
        return cls(started_time=now, item_id=item.id, message=message)
