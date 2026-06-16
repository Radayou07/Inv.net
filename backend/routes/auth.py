from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from model import db, Employee

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    identifier = data.get('identifier') # email, phone, or username
    password = data.get('password')

    if not identifier or not password:
        return jsonify({"msg": "Missing identifier or password"}), 400

    employee = Employee.query.filter(
        (Employee.email == identifier) | 
        (Employee.number == identifier) | 
        (Employee.username == identifier)
    ).first()

    if employee and employee.check_password(password):
        access_token = create_access_token(identity=str(employee.id))
        return jsonify(access_token=access_token, user=employee.to_dict()), 200
    
    return jsonify({"msg": "Bad username or password"}), 401

@auth_bp.route('/setup', methods=['POST'])
def setup():
    # Only allow setup if no employees exist
    if Employee.query.first():
        return jsonify({"msg": "Setup already done"}), 400
    
    data = request.get_json()
    try:
        admin = Employee(
            name=data.get('name', 'Admin'),
            username=data.get('username', 'admin'),
            email=data.get('email', 'admin@example.com'),
            number=data.get('number', '0000000000'),
            role='admin'
        )
        admin.set_password(data.get('password', 'admin123'))
        db.session.add(admin)
        db.session.commit()
        return jsonify({"msg": "Admin created successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
