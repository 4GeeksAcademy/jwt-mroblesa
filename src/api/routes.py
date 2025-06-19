"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/login', methods=['POST'])
def handle_login():
    
    response_body = {} 

    email = request.json.get('email', None)
    password = request.json.get('password', None)
    user = User.query.filter_by(email=email, password=password).first()

    if user:
        access_token = create_access_token(identity={'user_id' : user.id , 'email': user.email })
        response_body['message'] = 'Usuario logeado'
        response_body['access_token'] = access_token
        response_body['results'] = user.serialize()
        return jsonify(response_body), 200
    else:
        response_body['message'] = 'Credenciales incorrectas'
        return jsonify(response_body), 401
    

@api.route('/signup', methods=['POST'])
def handle_signup():
    response_body = {}
    data = request.json

    if not data or not data.get('email') or not data.get('password'):
        response_body['message'] = 'Email y contraseña son requeridos'
        return jsonify(response_body), 400

    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        response_body['message'] = 'El usuario ya existe'
        return jsonify(response_body), 400

    new_user = User(email=data['email'], password=data['password'], is_active=True)
    db.session.add(new_user)
    db.session.commit()

    response_body['message'] = 'Usuario creado exitosamente'
    return jsonify(response_body), 201

@api.route('/private', methods=['GET'])
@jwt_required()
def handle_private():
    current_user = get_jwt_identity()
    response_body = {
        "message": "Acceso concedido a área privada",
        "user": current_user
    }
    return jsonify(response_body), 200

@api.route('/logout', methods=['POST'])
@jwt_required()
def handle_logout():
    response_body = {"message": "Sesión cerrada"}
    return jsonify(response_body), 200
