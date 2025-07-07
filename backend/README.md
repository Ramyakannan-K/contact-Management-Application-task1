
# Contact Management API - Python Flask Backend

This is the Python Flask backend for the Contact Management Application with SQLite database.

## Setup Instructions

1. **Create a virtual environment:**
   ```bash
   cd backend
   python -m venv venv
   ```

2. **Activate the virtual environment:**
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Flask application:**
   ```bash
   python app.py
   ```

The API will be available at `http://localhost:5000`

## API Endpoints

- `GET /api/contacts` - Get all contacts
- `POST /api/contacts` - Create a new contact
- `GET /api/contacts/<id>` - Get a specific contact
- `PUT /api/contacts/<id>` - Update a contact
- `DELETE /api/contacts/<id>` - Delete a contact

## Database

The application uses SQLite database (`contacts.db`) which will be created automatically when you first run the application.

## Technology Stack

- **Backend Framework**: Python Flask
- **Database**: SQLite
- **CORS**: Flask-CORS for frontend integration
