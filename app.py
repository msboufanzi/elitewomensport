from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize database
def init_db():
    conn = sqlite3.connect('ews.db')
    cursor = conn.cursor()
    
    # Create contacts table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    # Create subscriptions table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS subscriptions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    # Create player_profiles table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS player_profiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        position TEXT NOT NULL,
        bio TEXT,
        image_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    conn.commit()
    conn.close()

# Initialize database on startup
init_db()

# API Routes
@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.json
    
    if not data or not all(k in data for k in ('name', 'email', 'message')):
        return jsonify({'error': 'Missing required fields'}), 400
    
    try:
        conn = sqlite3.connect('ews.db')
        cursor = conn.cursor()
        cursor.execute(
            'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
            (data['name'], data['email'], data['message'])
        )
        conn.commit()
        conn.close()
        
        return jsonify({'success': True, 'message': 'Contact form submitted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/subscribe', methods=['POST'])
def subscribe():
    data = request.json
    
    if not data or 'email' not in data:
        return jsonify({'error': 'Email is required'}), 400
    
    try:
        conn = sqlite3.connect('ews.db')
        cursor = conn.cursor()
        cursor.execute(
            'INSERT INTO subscriptions (email) VALUES (?)',
            (data['email'],)
        )
        conn.commit()
        conn.close()
        
        return jsonify({'success': True, 'message': 'Subscription successful'}), 200
    except sqlite3.IntegrityError:
        return jsonify({'error': 'Email already subscribed'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/player-profile', methods=['GET'])
def get_player_profiles():
    try:
        conn = sqlite3.connect('ews.db')
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM player_profiles')
        players = [dict(row) for row in cursor.fetchall()]
        conn.close()
        
        return jsonify({'success': True, 'players': players}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Admin routes with basic auth (to be expanded later)
@app.route('/api/admin/player-profile', methods=['POST'])
def add_player_profile():
    # Basic auth check (to be improved)
    auth = request.authorization
    if not auth or auth.username != 'admin' or auth.password != 'password':
        return jsonify({'error': 'Unauthorized'}), 401
    
    data = request.json
    
    if not data or not all(k in data for k in ('name', 'position')):
        return jsonify({'error': 'Missing required fields'}), 400
    
    try:
        conn = sqlite3.connect('ews.db')
        cursor = conn.cursor()
        cursor.execute(
            'INSERT INTO player_profiles (name, position, bio, image_url) VALUES (?, ?, ?, ?)',
            (data['name'], data['position'], data.get('bio', ''), data.get('image_url', ''))
        )
        conn.commit()
        conn.close()
        
        return jsonify({'success': True, 'message': 'Player profile added successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
