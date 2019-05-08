import enum
import datetime

from .. import db


class EventSeverity(enum.Enum):
    debug = 0
    info = 1
    warning = 2
    error = 3


class Event(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    created_time = db.Column(db.DateTime, nullable=False)
    severity = db.Column(db.Enum(EventSeverity), nullable=False)
    message = db.Column(db.Text, nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'created_time': self.created_time.isoformat(),
            'severity': self.severity.name,
            'message': self.message,
        }

    @classmethod
    def new(cls, severity, message):
        now = datetime.datetime.utcnow()
        return cls(created_time=now, severity=severity, message=message)

    @classmethod
    def new_debug(cls, message):
        return cls.new(EventSeverity.debug, message)

    @classmethod
    def new_info(cls, message):
        return cls.new(EventSeverity.info, message)

    @classmethod
    def new_warning(cls, message):
        return cls.new(EventSeverity.warning, message)

    @classmethod
    def new_error(cls, message):
        return cls.new(EventSeverity.error, message)
