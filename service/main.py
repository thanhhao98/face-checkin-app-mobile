import numpy as np
import time
import os
import cv2
import jwt
import datetime
from flask import (
    Flask,
    make_response,
    request,
    jsonify
)
from functools import wraps
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import (
    generate_password_hash,
    check_password_hash
)
from core.embedder import ArcFace
from core.identifier import Identifier
from config import config


app = Flask(__name__)
app.config['SECRET_KEY'] = config['SECRET_KEY']
app.config['SQLALCHEMY_DATABASE_URI'] = config['PATH_DB_MODEL']
app.config['TOKEN_LIFE_TIME'] = config['TOKEN_TIME_LIFE']
app.config['PATH_DATA_FOLDERS'] = config['PATH_DATA_FOLDERS']
app.config['NAME_FILE_EMBEDDING'] = config['NAME_FILE_EMBEDDING']

embedder = ArcFace(config['PATH_ARCFACE_MODEL'])

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80))
    pathToEmbedding = db.Column(db.String(512), unique=True, nullable=True)
    isAdmin = db.Column(db.Boolean)

def loadAllUserWithPath():
    users = User.query.all()
    output = {}
    for user in users:
        if user.pathToEmbedding:
            pathEmbedding =os.path.join(app.root_path,user.pathToEmbedding, app.config['NAME_FILE_EMBEDDING'])
            if os.path.isfile(pathEmbedding):
                output[user.id] = pathEmbedding
    print(output)
    return output

identifier = Identifier(loadAllUserWithPath())

def userRequired(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return jsonify({'message': 'Token is missing!, Login required'}), 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
            currentUser = User.query.filter_by(id=data['id']).first()
        except Exception as e:
            return jsonify({'message': 'Token is not valid!, Login required'}), 401
        return f(currentUser, *args, **kwargs)
    return decorated

def adminRequired(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return jsonify({'message': 'Token is missing!, Login required'}), 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
            currentUser = User.query.filter_by(id=data['id']).first()
            if not currentUser.isAdmin:
                return jsonify({'message': 'Current user has no permission get this funcion!, Login required'}), 401
        except Exception as e:
            return jsonify({'message': 'Token is not valid!, Login required'}), 401
        return f(currentUser, *args, **kwargs)
    return decorated

@app.route('/api/v1/createUser', methods=['POST'])
@adminRequired
def createUser(currentUser):
    if request.method == 'POST':
        data = request.form
        hashedPassword = generate_password_hash(data.get('password'), method='sha256')
        newUser = User(username=data.get('username'), email=data.get('email'), password=hashedPassword, isAdmin=False)
        db.session.add(newUser)
        db.session.commit()
        return jsonify({'message': 'success'})

@app.route('/api/v1/addFaceUser', methods=['POST'])
@adminRequired
def addFaceUser(currentUser):
    if request.method == 'POST':
        userId = request.form.get('userId')
        user = User.query.filter_by(id=userId).first()
        if not user:
            return jsonify({
                'status': False,
                'message': 'User id is not exist',
                'data': []
            })
        filestr = request.files['face'].read()
        npimg = np.fromstring(filestr, np.uint8)
        img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
        nameFolder = user.username
        if user.pathToEmbedding:
            subPath = user.pathToEmbedding
        else:
            subPath = os.path.join(app.config['PATH_DATA_FOLDERS'], user.username)
            user.pathToEmbedding = subPath
            db.session.commit()
        pathEmbedding = os.path.join(app.root_path,subPath)
        if not os.path.isdir(pathEmbedding):
            os.mkdir(pathEmbedding)
        pathImage = os.path.join(pathEmbedding, str(round(time.time()*100))+'.jpg')
        cv2.imwrite(pathImage, img)
        pathEmbedding = os.path.join(pathEmbedding, app.config['NAME_FILE_EMBEDDING'])
        print(pathEmbedding)
        embedder.dump_embedding(img, pathEmbedding)
        return jsonify({
            'status': True,
            'message': 'Add face for user successfully',
            'data': []
        })


@app.route('/api/v1/login', methods=['POST'])
def login():
    username = request.form.get('username')
    password = request.form.get('password')
    if not username or not password:
        return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})
    user = User.query.filter_by(username=username).first()
    if not user:
        return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})
    if check_password_hash(user.password, password):
        token = jwt.encode({'id' : user.id, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=app.config['TOKEN_LIFE_TIME'] )}, app.config['SECRET_KEY'])
        return jsonify({
            'status': True,
            'message': '',
            'data':{
                'isAdmin': user.isAdmin,
                'token' : token.decode('UTF-8'),
            }
        })
    return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

@app.route('/api/v1/checkFace', methods=['POST'])
@userRequired
def checkFace(currentUser):
    if request.method == 'POST':
        filestr = request.files['face'].read()
        npimg = np.fromstring(filestr, np.uint8)
        img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
        feature = embedder.get_feature(img)
        index = identifier.process(feature)
        r = {
            'status': True,
            'message': '',
            'data': {
                'isExist': True,
                'index': index
            }
        }
        return jsonify(r)

@app.route('/api/v1/test', methods=['GET'])
def test():
    db.create_all()
    return 'ok'


if __name__ == '__main__':
    app.run()
