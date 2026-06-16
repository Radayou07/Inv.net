from flask import Blueprint, request, jsonify
from model import db, Customer

customer_bp = Blueprint('customer', __name__)

@customer_bp.route('/customers', methods=['GET'])
def get_customers():
    customers = Customer.query.all()
    return jsonify([c.to_dict() for c in customers])

@customer_bp.route('/customers/<int:id>', methods=['GET'])
def get_customer(id):
    customer = Customer.query.get_or_404(id)
    return jsonify(customer.to_dict())

@customer_bp.route('/customers', methods=['POST'])
def create_customer():
    data = request.get_json()
    try:
        new_customer = Customer(
            name=data['name'],
            number=data['number'],
            email=data['email'],
            address=data['address'],
            image=data.get('image')
        )
        db.session.add(new_customer)
        db.session.commit()
        return jsonify(new_customer.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@customer_bp.route('/customers/<int:id>', methods=['PUT'])
def update_customer(id):
    customer = Customer.query.get_or_404(id)
    data = request.get_json()
    
    customer.name = data.get('name', customer.name)
    customer.number = data.get('number', customer.number)
    customer.email = data.get('email', customer.email)
    customer.address = data.get('address', customer.address)
    customer.image = data.get('image', customer.image)
    
    db.session.commit()
    return jsonify(customer.to_dict())

@customer_bp.route('/customers/<int:id>', methods=['DELETE'])
def delete_customer(id):
    customer = Customer.query.get_or_404(id)
    db.session.delete(customer)
    db.session.commit()
    return '', 204
