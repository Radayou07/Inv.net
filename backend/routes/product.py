from flask import Blueprint, request, jsonify
from model import db, Product, Image, Category

product_bp = Blueprint('product', __name__)

@product_bp.route('/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    return jsonify([c.to_dict() for c in categories])

@product_bp.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([p.to_dict() for p in products])

@product_bp.route('/products/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get_or_404(id)
    return jsonify(product.to_dict())

@product_bp.route('/products', methods=['POST'])
def create_product():
    data = request.get_json()
    try:
        new_product = Product(
            name=data['name'],
            price=data['price'],
            expire=data.get('expire'),
            brand=data['brand'],
            description=data.get('description'),
            category_id=data['category_id'],
            supplier_id=data['supplier_id'],
            discount_id=data.get('discount_id')
        )
        db.session.add(new_product)
        db.session.flush() # Get product ID for images

        if 'images' in data:
            for img_path in data['images']:
                new_image = Image(path=img_path, product_id=new_product.id)
                db.session.add(new_image)

        db.session.commit()
        return jsonify(new_product.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@product_bp.route('/products/<int:id>', methods=['PUT'])
def update_product(id):
    product = Product.query.get_or_404(id)
    data = request.get_json()
    
    product.name = data.get('name', product.name)
    product.price = data.get('price', product.price)
    product.expire = data.get('expire', product.expire)
    product.brand = data.get('brand', product.brand)
    product.description = data.get('description', product.description)
    product.category_id = data.get('category_id', product.category_id)
    product.supplier_id = data.get('supplier_id', product.supplier_id)
    product.discount_id = data.get('discount_id', product.discount_id)
    
    if 'images' in data:
        # Simple approach: clear and replace images
        Image.query.filter_by(product_id=product.id).delete()
        for img_path in data['images']:
            new_image = Image(path=img_path, product_id=product.id)
            db.session.add(new_image)
            
    db.session.commit()
    return jsonify(product.to_dict())

@product_bp.route('/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return '', 204
