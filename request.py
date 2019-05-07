import requests
import argparse

__base_url__ = 'http://127.0.0.1:5000'



def get(url, **kwargs):
    response = requests.get(__base_url__ + url, params=kwargs)
    return response.json()


def post(url, **kwargs):
    response = requests.post(__base_url__ + url, json=kwargs)
    return response.json()


def get_item_count():
    max_id = -1
    for item in get('/api/items'):
        if item['id'] > max_id:
            max_id = item['id']
    return max_id + 1


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--target', '-t', type=int)
    parser.add_argument('--name', '-n')
    parser.add_argument('--description', '-d')
    parser.add_argument('--weight', '-w', type=float)
    args = parser.parse_args()

    params = {}
    if args.name:
        params['name'] = args.name
    if args.description:
        params['description'] = args.description
    if args.weight:
        params['weight'] = args.weight

    if args.target:
        target_id = (get_item_count() + args.target) if args.target < 0 else args.target
        result = post('/api/items/%d' % target_id, **params)
    else:
        result = post('/api/items', **params)

    print(result)
