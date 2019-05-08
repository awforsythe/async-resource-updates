from flask_restful import Resource, reqparse

from .. import db, rest
from ..models import EventSeverity, Event
from ..util import page_listing, success, enum_arg


@rest.resource('/api/events')
class EventsRoot(Resource):

    GET_ARGS = reqparse.RequestParser()
    GET_ARGS.add_argument('n', dest='num_per_page', type=int, default=50)
    GET_ARGS.add_argument('p', dest='page_number', type=int, default=1)

    POST_ARGS = reqparse.RequestParser()
    POST_ARGS.add_argument('severity', type=enum_arg(EventSeverity), default=EventSeverity.info)
    POST_ARGS.add_argument('message', required=True)

    def get(self):
        args = self.GET_ARGS.parse_args()
        q = Event.query.order_by(Event.created_time.desc())
        page = q.paginate(args.page_number, args.num_per_page)
        return page_listing(page)

    def post(self):
        args = self.POST_ARGS.parse_args()
        new_event = Event.new(args.severity, args.message)
        db.session.add(new_event)
        db.session.commit()
        return success(new_event, 201)
