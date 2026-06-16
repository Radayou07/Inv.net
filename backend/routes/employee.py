from flask import Blueprint, request, jsonify
from model import db, Employee

employee_bp = Blueprint('employee', __name__)

@employee_bp.route('/employees', methods=['GET'])
def get_employees():
    employees = Employee.query.all()
    return jsonify([e.to_dict() for e in employees])

@employee_bp.route('/employees/<int:id>', methods=['GET'])
def get_employee(id):
    employee = Employee.query.get_or_404(id)
    return jsonify(employee.to_dict())

@employee_bp.route('/employees', methods=['POST'])
def create_employee():
    data = request.get_json()
    try:
        new_employee = Employee(
            name=data['name'],
            username=data['username'],
            number=data['number'],
            email=data['email'],
            role=data['role'],
            image=data.get('image')
        )
        new_employee.set_password(data['password'])
        db.session.add(new_employee)
        db.session.commit()
        return jsonify(new_employee.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@employee_bp.route('/employees/<int:id>', methods=['PUT'])
def update_employee(id):
    employee = Employee.query.get_or_404(id)
    data = request.get_json()
    
    employee.name = data.get('name', employee.name)
    employee.username = data.get('username', employee.username)
    employee.number = data.get('number', employee.number)
    employee.email = data.get('email', employee.email)
    employee.role = data.get('role', employee.role)
    employee.image = data.get('image', employee.image)
    
    if 'password' in data:
        employee.set_password(data['password'])
        
    db.session.commit()
    return jsonify(employee.to_dict())

@employee_bp.route('/employees/<int:id>', methods=['DELETE'])
def delete_employee(id):
    employee = Employee.query.get_or_404(id)
    db.session.delete(employee)
    db.session.commit()
    return '', 204
