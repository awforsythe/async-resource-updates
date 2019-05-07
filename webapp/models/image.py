from .. import db


class Image(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    png_data_base64 = db.Column(db.Text, nullable=False)
    md5_hash = db.Column(db.Text, nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'md5_hash': self.md5_hash,
            'url': '/api/images/%d' % self.id,
        }

    @classmethod
    def new(cls, png_data_base64, md5_hash):
        return cls(png_data_base64=png_data_base64, md5_hash=md5_hash)
