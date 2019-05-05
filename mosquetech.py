from flask import Flask
from flask_restless import APIManager
from flask_sqlalchemy import SQLAlchemy
import config
from datetime import datetime

app = Flask(__name__,static_url_path='')
app.config['SQLALCHEMY_DATABASE_URI'] = config.SQLALCHEMY_DATABASE_URI
db = SQLAlchemy(app)

class Device(db.Model):
    __tablename__ = 'devicelist'

    id = db.Column(db.Integer, primary_key=True)
    deviceName = db.Column(db.String(64), index=True, unique=True)
    transactions = db.relationship('Tabung', backref='device', lazy='dynamic')


class Tabung(db.Model):
    __tablename__ = 'transactiontable'

    transactionId = db.Column(db.Integer, primary_key=True)
    transactionAmt = db.Column(db.Integer, index=True)
    timestamp = db.Column(db.DateTime,  default=datetime.utcnow)
    device_id = db.Column(db.Integer, db.ForeignKey('devicelist.id'))

api_manager =  APIManager(app, flask_sqlalchemy_db=db)
api_manager.create_api(Device,methods=['GET','POST','DELETE'])
api_manager.create_api(Tabung,methods=['GET','POST','DELETE','PUT'],allow_functions=True)

@app.route('/')
def index():
     return app.send_static_file("index.html")

app.debug = True

if __name__ == '__main__':
    app.run(host='0.0.0.0')
