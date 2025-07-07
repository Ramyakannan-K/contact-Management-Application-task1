
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import sqlite3
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

DATABASE = 'contacts.db'

def init_db():
    """Initialize the database with contacts table"""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstName TEXT NOT NULL,
            lastName TEXT NOT NULL,
            address TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phoneNumber TEXT NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    conn.commit()
    conn.close()

def get_db_connection():
    """Get database connection"""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/api/contacts', methods=['GET'])
def get_contacts():
    """Get all contacts"""
    try:
        conn = get_db_connection()
        contacts = conn.execute('SELECT * FROM contacts ORDER BY createdAt DESC').fetchall()
        conn.close()
        
        contacts_list = []
        for contact in contacts:
            contacts_list.append({
                'id': str(contact['id']),
                'firstName': contact['firstName'],
                'lastName': contact['lastName'],
                'address': contact['address'],
                'email': contact['email'],
                'phoneNumber': contact['phoneNumber'],
                'createdAt': contact['createdAt'],
                'updatedAt': contact['updatedAt']
            })
        
        return jsonify(contacts_list)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/contacts', methods=['POST'])
def create_contact():
    """Create a new contact"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['firstName', 'lastName', 'address', 'email', 'phoneNumber']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        conn = get_db_connection()
        
        # Check for duplicate email
        existing = conn.execute('SELECT id FROM contacts WHERE email = ?', (data['email'],)).fetchone()
        if existing:
            conn.close()
            return jsonify({'error': 'A contact with this email already exists'}), 400
        
        # Insert new contact
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO contacts (firstName, lastName, address, email, phoneNumber)
            VALUES (?, ?, ?, ?, ?)
        ''', (data['firstName'], data['lastName'], data['address'], data['email'], data['phoneNumber']))
        
        contact_id = cursor.lastrowid
        conn.commit()
        
        # Get the created contact
        contact = conn.execute('SELECT * FROM contacts WHERE id = ?', (contact_id,)).fetchone()
        conn.close()
        
        return jsonify({
            'id': str(contact['id']),
            'firstName': contact['firstName'],
            'lastName': contact['lastName'],
            'address': contact['address'],
            'email': contact['email'],
            'phoneNumber': contact['phoneNumber'],
            'createdAt': contact['createdAt'],
            'updatedAt': contact['updatedAt']
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/contacts/<contact_id>', methods=['PUT'])
def update_contact(contact_id):
    """Update an existing contact"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['firstName', 'lastName', 'address', 'email', 'phoneNumber']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        conn = get_db_connection()
        
        # Check if contact exists
        existing_contact = conn.execute('SELECT * FROM contacts WHERE id = ?', (contact_id,)).fetchone()
        if not existing_contact:
            conn.close()
            return jsonify({'error': 'Contact not found'}), 404
        
        # Check for duplicate email (excluding current contact)
        duplicate = conn.execute('SELECT id FROM contacts WHERE email = ? AND id != ?', 
                                (data['email'], contact_id)).fetchone()
        if duplicate:
            conn.close()
            return jsonify({'error': 'A contact with this email already exists'}), 400
        
        # Update contact
        conn.execute('''
            UPDATE contacts 
            SET firstName = ?, lastName = ?, address = ?, email = ?, phoneNumber = ?, updatedAt = CURRENT_TIMESTAMP
            WHERE id = ?
        ''', (data['firstName'], data['lastName'], data['address'], data['email'], data['phoneNumber'], contact_id))
        
        conn.commit()
        
        # Get updated contact
        contact = conn.execute('SELECT * FROM contacts WHERE id = ?', (contact_id,)).fetchone()
        conn.close()
        
        return jsonify({
            'id': str(contact['id']),
            'firstName': contact['firstName'],
            'lastName': contact['lastName'],
            'address': contact['address'],
            'email': contact['email'],
            'phoneNumber': contact['phoneNumber'],
            'createdAt': contact['createdAt'],
            'updatedAt': contact['updatedAt']
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/contacts/<contact_id>', methods=['DELETE'])
def delete_contact(contact_id):
    """Delete a contact"""
    try:
        conn = get_db_connection()
        
        # Check if contact exists
        existing_contact = conn.execute('SELECT * FROM contacts WHERE id = ?', (contact_id,)).fetchone()
        if not existing_contact:
            conn.close()
            return jsonify({'error': 'Contact not found'}), 404
        
        # Delete contact
        conn.execute('DELETE FROM contacts WHERE id = ?', (contact_id,))
        conn.commit()
        conn.close()
        
        return jsonify({'message': 'Contact deleted successfully'})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/contacts/<contact_id>', methods=['GET'])
def get_contact(contact_id):
    """Get a specific contact by ID"""
    try:
        conn = get_db_connection()
        contact = conn.execute('SELECT * FROM contacts WHERE id = ?', (contact_id,)).fetchone()
        conn.close()
        
        if not contact:
            return jsonify({'error': 'Contact not found'}), 404
        
        return jsonify({
            'id': str(contact['id']),
            'firstName': contact['firstName'],
            'lastName': contact['lastName'],
            'address': contact['address'],
            'email': contact['email'],
            'phoneNumber': contact['phoneNumber'],
            'createdAt': contact['createdAt'],
            'updatedAt': contact['updatedAt']
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5000)
