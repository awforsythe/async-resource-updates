from flask import make_response, jsonify
from flask_restful import Resource, reqparse

from . import db, rest, socketio
from .models import Item


def listing(objs, status_code=200):
    return make_response(jsonify([obj.serialize() for obj in objs]), status_code)


def success(obj, status_code=200):
    return make_response(jsonify(obj.serialize()), status_code)


def failure(message, status_code=404):
    return make_response(jsonify({'message': message}), status_code)


@rest.resource('/api/items')
class ItemsRoot(Resource):

    POST_ARGS = reqparse.RequestParser()
    POST_ARGS.add_argument('name', required=True)
    POST_ARGS.add_argument('description')
    POST_ARGS.add_argument('weight', type=float)

    def get(self):
        items = Item.query.order_by(Item.created_time.desc()).all()
        return listing(items)

    def post(self):
        args = self.POST_ARGS.parse_args()
        if Item.query.filter_by(name=args.name).first():
            return failure("Item '%s' already exists" % args.name, 409)

        item = Item.new(args.name, args.description, args.weight)
        db.session.add(item)
        db.session.commit()
        socketio.emit('item_created', item.serialize())
        return success(item, 201)


@rest.resource('/api/items/<int:item_id>')
class ItemById(Resource):

    POST_ARGS = reqparse.RequestParser()
    POST_ARGS.add_argument('name')
    POST_ARGS.add_argument('description')
    POST_ARGS.add_argument('weight', type=float)

    def get(self, item_id):
        item = Item.query.get(item_id)
        if not item:
            return failure("Item %d not found" % item_id)
        return success(item)

    def post(self, item_id):
        item = Item.query.get(item_id)
        if not item:
            return failure("Item %d not found" % item_id)

        args = self.POST_ARGS.parse_args()
        changed = False

        if args.name and args.name != item.name:
            if Item.query.filter_by(name=args.name).first():
                return make_response("Name '%s' is already taken" % args.name, 409)
            item.name = args.name
            changed = True

        if args.description is not None and args.description != item.description:
            item.description = args.description
            changed = True

        if args.weight is not None and args.weight != item.weight:
            item.weight = args.weight
            changed = True

        if not changed:
            return failure("No fields changed", 400)

        db.session.add(item)
        db.session.commit()
        socketio.emit('item_changed', item.serialize())
        return success(item)