from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from config import Config

# Create flash app
app = Flask(__name__)
app.config.from_object(Config)

# Enable CORS (allows React to connect)
CORS(app)

# Initialize database
db = SQLAlchemy(app)

@app.route('/api')
def home():
    return jsonify({'message': 'Flask is running'})

@app.route('/api/test_db')
def test_db():
    try:
        result = db.session.execute(text('SELECT 1'))
        return jsonify({'status': 'Database Connected'})
    
    except Exception as e:
        return jsonify({'status': 'Database Fail', 'error': str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True, port=5000)