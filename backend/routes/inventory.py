from flask import Blueprint, request, jsonify
from model import db, Warehouse, Inventory

inventory_bp = Blueprint('inventory', __name__)

# Warehouse routes
@inventory_bp.route('/warehouses', methods=['GET'])
def get_warehouses():
    warehouses = Warehouse.query.all()
    return jsonify([w.to_dict() for w in warehouses])

@inventory_bp.route('/warehouses', methods=['POST'])
def create_warehouse():
    data = request.get_json()
    try:
        new_warehouse = Warehouse(
            name=data['name'],
            location=data['location'],
            capacity=data['capacity'],
            employee_id=data['employee_id']
        )
        db.session.add(new_warehouse)
        db.session.commit()
        return jsonify(new_warehouse.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

# Inventory routes
@inventory_bp.route('/inventory', methods=['GET'])
def get_inventory():
    inventory_items = Inventory.query.all()
    return jsonify([i.to_dict() for i in inventory_items])

@inventory_bp.route('/inventory', methods=['POST'])
def update_inventory():
    data = request.get_json()
    try:
        item = Inventory.query.filter_by(
            product_id=data['product_id'], 
            warehouse_id=data['warehouse_id']
        ).first()
        
        if item:
            item.quantity = data['quantity']
            item.last_update = db.func.current_date()
        else:
            item = Inventory(
                product_id=data['product_id'],
                warehouse_id=data['warehouse_id'],
                quantity=data['quantity']
            )
            db.session.add(item)
            
        db.session.commit()
        return jsonify(item.to_dict())
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
