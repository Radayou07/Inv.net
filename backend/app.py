from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from model import db
from config import Config

# Import blueprints
from routes.employee import employee_bp
from routes.auth import auth_bp
from routes.product import product_bp
from routes.customer import customer_bp
from routes.supplier import supplier_bp
from routes.inventory import inventory_bp

# Create flash app
app = Flask(__name__)
app.config.from_object(Config)

# Enable CORS (allows React to connect)
CORS(app)

# Initialize database
db.init_app(app)

# Initialize JWT
jwt = JWTManager(app)

# Register Blueprints
app.register_blueprint(employee_bp, url_prefix='/api')
app.register_blueprint(auth_bp, url_prefix='/api')
app.register_blueprint(product_bp, url_prefix='/api')
app.register_blueprint(customer_bp, url_prefix='/api')
app.register_blueprint(supplier_bp, url_prefix='/api')
app.register_blueprint(inventory_bp, url_prefix='/api')

@app.route('/api')
def home():
    return jsonify({'message': 'Flask is running'})

@app.route('/api/test_db')
def test_db():
    try:
        from sqlalchemy import text
        result = db.session.execute(text('SELECT 1'))
        return jsonify({'status': 'Database Connected'})
    
    except Exception as e:
        return jsonify({'status': 'Database Fail', 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
