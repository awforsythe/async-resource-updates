import datetime

from flask_restful import Resource, reqparse

from .. import db, rest
from ..models import Task, Item
from ..util import listing, success, failure, status_204


@rest.resource('/api/tasks')
class TasksRoot(Resource):

    GET_ARGS = reqparse.RequestParser()
    GET_ARGS.add_argument('item_id', type=int)

    POST_ARGS = reqparse.RequestParser()
    POST_ARGS.add_argument('item_id', type=int, required=True)
    POST_ARGS.add_argument('message')

    def get(self):
        args = self.GET_ARGS.parse_args()
        q = Task.query.filter_by(item_id=args.item_id) if args.item_id else Task.query
        return listing(q.order_by(Task.started_time.desc()).all())

    def post(self):
        args = self.POST_ARGS.parse_args()
        item = Item.query.get(args.item_id)
        if not item:
            return failure("Item %d not found" % args.item_id)

        task = Task.new(item, message=args.message)
        db.session.add(task)
        db.session.commit()
        return success(task, 201)


@rest.resource('/api/tasks/<int:task_id>')
class TaskById(Resource):

    POST_ARGS = reqparse.RequestParser()
    POST_ARGS.add_argument('progress_pct', type=float)
    POST_ARGS.add_argument('message')
    POST_ARGS.add_argument('finished', type=bool)
    POST_ARGS.add_argument('successful', type=bool)

    def get(self, task_id):
        task = Task.query.get(task_id)
        if not task:
            return failure("Task %d not found" % task_id)
        return success(task)

    def post(self, task_id):
        task = Task.query.get(task_id)
        if not task:
            return failure("Task %d not found" % task_id)
        if task.finished_time is not None:
            return failure("Task %d is already finished" % task.id)

        args = self.POST_ARGS.parse_args()
        if args.finished:
            task.finished_time = datetime.datetime.utcnow()
            task.successful = args.successful if args.successful is not None else False
            task.progress_pct = 1.0
            task.message = args.message or task.message
        else:
            if args.progress_pct:
                task.progress_pct = args.progress_pct
            if args.message:
                task.message = args.message

        db.session.add(task)
        db.session.commit()
        return success(task)

    def delete(self, task_id):
        task = Task.query.get(task_id)
        if not task:
            return failure("Task %d not found" % task_id)

        db.session.delete(task)
        db.session.commit()
        return status_204()
