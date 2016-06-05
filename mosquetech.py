from flask import Flask
from flask.ext.restless import APIManager
from flask_sqlalchemy import SQLAlchemy
import config
import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = config.SQLALCHEMY_DATABASE_URI
db = SQLAlchemy(app)


class Device(db.Model):
    __tablename__ = 'deviceList'

    id = db.Column(db.Integer, primary_key=True)
    deviceName = db.Column(db.String(64), index=True, unique=True)
    transactions = db.relationship('Tabung', backref='device', lazy='dynamic')


class Tabung(db.Model):
    __tablename__ = 'transactionTable'

    id = db.Column(db.Integer, primary_key=True)
    transAmt = db.Column(db.Integer, index=True)
    timestamp = db.Column(db.DateTime)
    device_id = db.Column(db.Integer, db.ForeignKey('deviceList.id'))

db.create_all()

api_manager =  APIManager(app, flask_sqlalchemy_db=db)
api_manager.create_api(Tabung,methods=['GET','POST','DELECT','PUT'])

@app.route('/')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    app.run()
