from flask import make_response, jsonify


def listing(objs, status_code=200):
    return make_response(jsonify([obj.serialize() for obj in objs]), status_code)


def success(obj, status_code=200):
    return make_response(jsonify(obj.serialize()), status_code)


def failure(message, status_code=404):
    return make_response(jsonify({'message': message}), status_code)
