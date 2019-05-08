import base64
import hashlib
from io import BytesIO

from flask import request, send_file
from flask_restful import Resource, reqparse
from werkzeug.datastructures import FileStorage

from .. import db, rest
from ..models import Image, Item
from ..util import listing, success, failure, status_204


def read_image(file):
    if file.content_type == 'image/png':
        png_data = file.read()
        md5_digest = hashlib.md5(png_data).hexdigest()
        return png_data, md5_digest
    return None, None


@rest.resource('/api/images')
class ImagesRoot(Resource):

    POST_ARGS = reqparse.RequestParser()
    POST_ARGS.add_argument('image', type=FileStorage, location='files', required=True)

    def get(self):
        return listing(Image.query.all())

    def post(self):
        args = self.POST_ARGS.parse_args()
        png_data, md5_digest = read_image(args.image)
        if not png_data or not md5_digest:
            return failure("Not a valid PNG file")

        existing_image = Image.query.filter_by(md5_hash=md5_digest).first()
        if existing_image:
            return success(existing_image, 200)

        base64_str = str(base64.b64encode(png_data), 'utf-8')
        new_image = Image.new(base64_str, md5_digest)
        db.session.add(new_image)
        db.session.commit()
        return success(new_image, 201)


@rest.resource('/api/images/<int:image_id>')
class ImageById(Resource):

    POST_ARGS = reqparse.RequestParser()
    POST_ARGS.add_argument('image', type=FileStorage, location='files', required=True)

    def get(self, image_id):
        image = Image.query.get(image_id)
        if not image:
            return failure("Image %d not found" % image_id)

        buf = BytesIO()
        buf.write(base64.b64decode(image.png_data_base64))
        buf.seek(0)
        return send_file(buf, mimetype='image/png')

    def post(self, image_id):
        # Read in the image data from the uploaded file
        args = self.POST_ARGS.parse_args()
        png_data, md5_digest = read_image(args.image)
        if not png_data or not md5_digest:
            return failure("Not a valid PNG file")

        # Find the Image object that we want to replace
        image = Image.query.get(image_id)
        if not image:
            return failure("Image %d not found" % image_id)

        # Search for an Image that's identical to the one we're uploading: if it's the one we want to replace, we're done
        existing_image = Image.query.filter_by(md5_hash=md5_digest).first()
        if existing_image and existing_image.id == image.id:
            return status_204()

        # Otherwise, we don't need to make a new image; we can just swap all references and delete the old image
        if existing_image:
            for item in Item.query.filter_by(image_id=image.id).all():
                item.image_id = existing_image.id
                db.session.add(item)
            db.session.delete(image)
            db.session.commit()
            return status_204()

        # If this is a new image, we first need to store it and flush so it has an ID
        base64_str = str(base64.b64encode(png_data), 'utf-8')
        new_image = Image.new(base64_str, md5_digest)
        db.session.add(new_image)
        db.session.flush()

        # Now we can update all affected items to replace our new image, and delete the old one
        for item in Item.query.filter_by(image_id=image.id).all():
            item.image_id = new_image.id
            db.session.add(item)
        db.session.delete(image)
        db.session.commit()
        return status_204()

    def delete(self, image_id):
        image = Image.query.get(image_id)
        if not image:
            return failure("Image %d not found" % image_id)

        db.session.delete(image)
        for item in Item.query.filter_by(image_id=image.id).all():
            item.image_id = None
            db.session.add(item)
        db.session.commit()
        return status_204()
