from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

db = SQLAlchemy()

class Employee(db.Model):
    __tablename__ = 'employee'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    number = db.Column(db.String(20), nullable=False, unique=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    role = db.Column(db.Enum('admin', 'manager', 'staff'), nullable=False)
    image = db.Column(db.String(255), nullable=True)

    # Relationships
    warehouses = db.relationship('Warehouse', backref='manager', lazy=True)
    payments_received = db.relationship('PaymentCustomer', backref='employee', lazy=True)
    purchases = db.relationship('Purchase', backref='employee', lazy=True)
    supplier_payments = db.relationship('PaymentSupplier', backref='employee', lazy=True)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'username': self.username,
            'number': self.number,
            'email': self.email,
            'role': self.role,
            'image': self.image,
            'location': self.warehouses[0].location if self.warehouses else "N/A"
        }

class Category(db.Model):
    __tablename__ = 'category'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    description = db.Column(db.String(255), nullable=True)
    products = db.relationship('Product', backref='category', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description
        }

class Customer(db.Model):
    __tablename__ = 'customer'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    number = db.Column(db.String(20), nullable=False, unique=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    address = db.Column(db.String(255), nullable=False)
    image = db.Column(db.String(255), nullable=True)
    orders = db.relationship('Order', backref='customer', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'number': self.number,
            'email': self.email,
            'address': self.address,
            'image': self.image
        }

class Supplier(db.Model):
    __tablename__ = 'supplier'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    number = db.Column(db.String(20), nullable=False, unique=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    address = db.Column(db.String(255), nullable=False)
    products = db.relationship('Product', backref='supplier', lazy=True)
    purchases = db.relationship('Purchase', backref='supplier', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'number': self.number,
            'email': self.email,
            'address': self.address
        }

class Discount(db.Model):
    __tablename__ = 'discount'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    percentage = db.Column(db.Numeric(5, 2), nullable=False)
    start_date = db.Column(db.Date, nullable=True)
    end_date = db.Column(db.Date, nullable=True)
    products = db.relationship('Product', backref='discount', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'percentage': float(self.percentage),
            'start_date': self.start_date.isoformat() if self.start_date else None,
            'end_date': self.end_date.isoformat() if self.end_date else None
        }

class Product(db.Model):
    __tablename__ = 'product'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    expire = db.Column(db.Date, nullable=True)
    brand = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    supplier_id = db.Column(db.Integer, db.ForeignKey('supplier.id'), nullable=False)
    discount_id = db.Column(db.Integer, db.ForeignKey('discount.id'), nullable=True)

    images = db.relationship('Image', backref='product', lazy=True, cascade="all, delete-orphan")
    inventory = db.relationship('Inventory', backref='product', lazy=True)
    order_details = db.relationship('OrderDetail', backref='product', lazy=True)
    purchase_details = db.relationship('PurchaseDetail', backref='product', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': float(self.price),
            'expire': self.expire.isoformat() if self.expire else None,
            'brand': self.brand,
            'description': self.description,
            'category_id': self.category_id,
            'supplier_id': self.supplier_id,
            'discount_id': self.discount_id,
            'category_name': self.category.name if self.category else None,
            'supplier_name': self.supplier.name if self.supplier else None,
            'images': [img.path for img in self.images]
        }

class Image(db.Model):
    __tablename__ = 'image'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    path = db.Column(db.String(255), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id', ondelete='CASCADE'), nullable=False)

class Warehouse(db.Model):
    __tablename__ = 'warehouse'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    capacity = db.Column(db.Integer, nullable=False) # In SQL it's TINYINT
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)
    inventory = db.relationship('Inventory', backref='warehouse', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'location': self.location,
            'capacity': self.capacity,
            'employee_id': self.employee_id,
            'manager_name': self.manager.name if self.manager else None
        }

class Inventory(db.Model):
    __tablename__ = 'inventory'
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), primary_key=True)
    warehouse_id = db.Column(db.Integer, db.ForeignKey('warehouse.id'), primary_key=True)
    last_update = db.Column(db.Date, nullable=False, default=datetime.utcnow)
    quantity = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            'product_id': self.product_id,
            'warehouse_id': self.warehouse_id,
            'last_update': self.last_update.isoformat(),
            'quantity': self.quantity,
            'product_name': self.product.name if self.product else None,
            'warehouse_name': self.warehouse.name if self.warehouse else None
        }

class Order(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    date = db.Column(db.Date, nullable=False, default=datetime.utcnow)
    payment_status = db.Column(db.Integer, nullable=False) # TINYINT
    status = db.Column(db.Integer, nullable=False) # TINYINT
    preorder = db.Column(db.Integer, nullable=False) # TINYINT
    total = db.Column(db.Numeric(10, 2), nullable=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'), nullable=False)
    details = db.relationship('OrderDetail', backref='order', lazy=True)
    payments = db.relationship('PaymentCustomer', backref='order', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'date': self.date.isoformat(),
            'payment_status': self.payment_status,
            'status': self.status,
            'preorder': self.preorder,
            'total': float(self.total) if self.total else 0,
            'customer_id': self.customer_id,
            'customer_name': self.customer.name if self.customer else None
        }

class OrderDetail(db.Model):
    __tablename__ = 'order_detail'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    sub_total = db.Column(db.Numeric(10, 2), nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)

class PaymentCustomer(db.Model):
    __tablename__ = 'payment_customer'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    date = db.Column(db.Date, nullable=False, default=datetime.utcnow)
    total = db.Column(db.Numeric(10, 2), nullable=False)
    status = db.Column(db.Enum('complete', 'pending', 'cancel'), nullable=False)
    method = db.Column(db.Enum('cash', 'credit card', 'transfer'), nullable=False)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)

class Purchase(db.Model):
    __tablename__ = 'purchase'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    date = db.Column(db.Date, nullable=True, default=datetime.utcnow)
    total = db.Column(db.Numeric(10, 2), nullable=False)
    supplier_id = db.Column(db.Integer, db.ForeignKey('supplier.id'), nullable=False)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)
    details = db.relationship('PurchaseDetail', backref='purchase', lazy=True)
    payments = db.relationship('PaymentSupplier', backref='purchase', lazy=True)

class PaymentSupplier(db.Model):
    __tablename__ = 'payment_supplier'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    date = db.Column(db.Date, nullable=False, default=datetime.utcnow)
    total = db.Column(db.Numeric(10, 2), nullable=False)
    status = db.Column(db.Enum('approve', 'pending', 'decline'), nullable=False)
    method = db.Column(db.Enum('cash', 'credit card', 'transfer'), nullable=False)
    purchase_id = db.Column(db.Integer, db.ForeignKey('purchase.id'), nullable=False)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)

class PurchaseDetail(db.Model):
    __tablename__ = 'purchase_detail'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    sub_total = db.Column(db.Numeric(10, 2), nullable=True)
    quantity = db.Column(db.Integer, nullable=False)
    purchase_id = db.Column(db.Integer, db.ForeignKey('purchase.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
