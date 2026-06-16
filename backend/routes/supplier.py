from flask import Blueprint, request, jsonify
from model import db, Supplier

supplier_bp = Blueprint('supplier', __name__)

@supplier_bp.route('/suppliers', methods=['GET'])
def get_suppliers():
    suppliers = Supplier.query.all()
    return jsonify([s.to_dict() for s in suppliers])

@supplier_bp.route('/suppliers/<int:id>', methods=['GET'])
def get_supplier(id):
    supplier = Supplier.query.get_or_404(id)
    return jsonify(supplier.to_dict())

@supplier_bp.route('/suppliers', methods=['POST'])
def create_supplier():
    data = request.get_json()
    try:
        new_supplier = Supplier(
            name=data['name'],
            number=data['number'],
            email=data['email'],
            address=data['address']
        )
        db.session.add(new_supplier)
        db.session.commit()
        return jsonify(new_supplier.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@supplier_bp.route('/suppliers/<int:id>', methods=['PUT'])
def update_supplier(id):
    supplier = Supplier.query.get_or_404(id)
    data = request.get_json()
    
    supplier.name = data.get('name', supplier.name)
    supplier.number = data.get('number', supplier.number)
    supplier.email = data.get('email', supplier.email)
    supplier.address = data.get('address', supplier.address)
    
    db.session.commit()
    return jsonify(supplier.to_dict())

@supplier_bp.route('/suppliers/<int:id>', methods=['DELETE'])
def delete_supplier(id):
    supplier = Supplier.query.get_or_404(id)
    db.session.delete(supplier)
    db.session.commit()
    return '', 204
