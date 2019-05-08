from flask import make_response, jsonify


def listing(objs, status_code=200):
    return make_response(jsonify([obj.serialize() for obj in objs]), status_code)


def page_listing(page, status_code=200):
    data = {
        'total': page.total,
        'per_page': page.per_page,
        'page': page.page,
        'pages': page.pages,
        'items': [obj.serialize() for obj in page.items]
    }
    return make_response(jsonify(data), status_code)


def success(obj, status_code=200):
    return make_response(jsonify(obj.serialize()), status_code)


def failure(message, status_code=404):
    return make_response(jsonify({'message': message}), status_code)


def status_204():
    return make_response('', 204)


def enum_arg(enum):
    def type_func(name):
        value = enum.__members__.get(name)
        if not value:
            raise ValueError("'%s' is not a valid %s" % (name, enum.__name__))
        return value
    return type_func
