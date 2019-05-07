import os
import requests
import argparse

__base_url__ = 'http://127.0.0.1:5000'
__unset__ = '__unset_value'


def get(url, **kwargs):
    response = requests.get(__base_url__ + url, params=kwargs)
    return response.json()


def post(url, **kwargs):
    response = requests.post(__base_url__ + url, json=kwargs)
    return response.json()


def post_file(url, filepath, name, mimetype):
    filename = os.path.basename(filepath)
    files = {name: (filename, open(filepath, 'rb'), mimetype)}
    response = requests.post(__base_url__ + url, files=files)
    return response.json()


def delete(url):
    response = requests.delete(__base_url__ + url)
    if response.status_code == 204:
        return 'DELETE OK.'
    return response.json()


def get_item_id(target):
    if target > 0:
        return target

    max_id = -1
    for item in get('/api/items'):
        if item['id'] > max_id:
            max_id = item['id']

    result = max_id + 1 + target
    if result <= 0:
        raise ValueError("Invalid item ID")
    return result


def get_item_params(name, description, weight, image_id):
    params = {}
    if name:
        params['name'] = name
    if description:
        params['description'] = None if description == __unset__ else description
    if weight:
        params['weight'] = None if weight == __unset__ else weight
    if image_id:
        params['image_id'] = None if image_id == __unset__ else image_id
    return params


def argtype_string(x):
    if x:
        if x.lower() == 'unset':
            return __unset__
        return x


def argtype_float(x):
    if x:
        if x.lower() == 'unset':
            return __unset__
        return float(x)


def argtype_image(x):
    if x:
        try:
            return int(x)
        except ValueError:
            if x.lower() == 'unset':
                return __unset__
            return post_file('/api/images', x, 'image', 'image/png')['id']


def create_item(args):
    params = get_item_params(args.name, args.description, args.weight, args.image)
    item = post('/api/items', **params)
    print(item)


def update_item(args):
    item_id = get_item_id(args.item_id)
    params = get_item_params(args.name, args.description, args.weight, args.image)
    item = post('/api/items/%d' % item_id, **params)
    print(item)


def delete_item(args):
    raise NotImplementedError


def create_image(args):
    response = post_file('/api/images', args.filename, 'image', 'image/png')
    print(response)


def update_image(args):
    raise NotImplementedError


def delete_image(args):
    response = delete('/api/images/%d' % args.image_id)
    print(response)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    subparsers = parser.add_subparsers(title='commands', dest='command')

    parser_create_item = subparsers.add_parser('create-item')
    parser_create_item.add_argument('name')
    parser_create_item.add_argument('--description', '-d', type=argtype_string)
    parser_create_item.add_argument('--weight', '-w', type=argtype_float)
    parser_create_item.add_argument('--image', '-i', type=argtype_image)
    parser_create_item.set_defaults(func=create_item)

    parser_update_item = subparsers.add_parser('update-item')
    parser_update_item.add_argument('item_id', type=int)
    parser_update_item.add_argument('--name', '-n')
    parser_update_item.add_argument('--description', '-d', type=argtype_string)
    parser_update_item.add_argument('--weight', '-w', type=argtype_float)
    parser_update_item.add_argument('--image', '-i', type=argtype_image)
    parser_update_item.set_defaults(func=update_item)

    parser_delete_item = subparsers.add_parser('delete-item')
    parser_delete_item.add_argument('item_id', type=int)
    parser_delete_item.set_defaults(func=delete_item)

    parser_create_image = subparsers.add_parser('create-image')
    parser_create_image.add_argument('filename')
    parser_create_image.set_defaults(func=create_image)

    parser_update_image = subparsers.add_parser('update-image')
    parser_update_image.add_argument('image_id', type=int)
    parser_update_image.add_argument('filename')
    parser_update_image.set_defaults(func=update_image)

    parser_delete_image = subparsers.add_parser('delete-image')
    parser_delete_image.add_argument('image_id', type=int)
    parser_delete_image.set_defaults(func=delete_image)

    args = parser.parse_args()
    args.func(args)
