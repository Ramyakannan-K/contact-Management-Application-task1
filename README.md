
# Contact Management Application

A full-stack contact management application built with React frontend and Python Flask backend.

## Technology Stack

### Frontend
- **React** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Vite** for build tooling

### Backend
- **Python Flask** for REST API
- **SQLite** database for persistent storage
- **Flask-CORS** for cross-origin requests

## Features

✅ **CRUD Operations**: Create, Read, Update, Delete contacts
✅ **Data Validation**: Email format validation, required fields, duplicate prevention
✅ **Search Functionality**: Search contacts by name, email, or phone
✅ **Responsive Design**: Mobile-friendly interface
✅ **Persistent Storage**: SQLite database
✅ **Real-time Updates**: Instant feedback with toast notifications

## Setup Instructions

### Backend Setup (Flask API)

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create and activate virtual environment:**
   ```bash
   python -m venv venv
   # Windows:
   venv\Scripts\activate
   # macOS/Linux:
   source venv/bin/activate
   ```

3. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Flask application:**
   ```bash
   python app.py
   ```
   The API will be available at `http://localhost:5000`

### Frontend Setup (React App)

1. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

## API Endpoints

- `GET /api/contacts` - Get all contacts
- `POST /api/contacts` - Create a new contact
- `GET /api/contacts/<id>` - Get a specific contact
- `PUT /api/contacts/<id>` - Update a contact
- `DELETE /api/contacts/<id>` - Delete a contact

## Database Schema

The SQLite database contains a `contacts` table with the following fields:
- `id` (INTEGER PRIMARY KEY)
- `firstName` (TEXT, NOT NULL)
- `lastName` (TEXT, NOT NULL) 
- `address` (TEXT, NOT NULL)
- `email` (TEXT, UNIQUE, NOT NULL)
- `phoneNumber` (TEXT, NOT NULL)
- `createdAt` (TIMESTAMP)
- `updatedAt` (TIMESTAMP)

## Usage Instructions

1. **Start both servers** (backend on port 5000, frontend on port 5173)
2. **Create a contact** by clicking "Add New Contact" and filling out the form
3. **View contacts** in the main list with search functionality
4. **Edit contacts** by clicking the "Edit" button on any contact card
5. **Delete contacts** by clicking the "Delete" button and confirming the action

## Demo Video Recording Checklist

For your demonstration video, make sure to show:

- ✅ **Create a record**: Add a new contact with all required fields
- ✅ **Display a record**: Show the contact list and individual contact details
- ✅ **Update a record**: Edit an existing contact and save changes
- ✅ **Delete a record**: Remove a contact and confirm deletion

## Project Structure

```
contact-management-app/
├── backend/
│   ├── app.py              # Flask application
│   ├── requirements.txt    # Python dependencies
│   ├── contacts.db         # SQLite database (auto-generated)
│   └── README.md          # Backend documentation
├── src/
│   ├── components/        # React components
│   ├── services/         # API service layer
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   └── pages/           # Page components
└── README.md            # This file
```

## Why This Technology Stack?

- **React + TypeScript**: Provides type safety and excellent developer experience
- **Python Flask**: Lightweight, flexible, and easy to understand for demonstrations
- **SQLite**: File-based database that's perfect for demos (no setup required)
- **Tailwind CSS**: Rapid UI development with consistent styling
- **Modern Architecture**: Separation of concerns with clear API boundaries

This stack demonstrates modern web development practices while remaining simple enough for educational purposes and easy deployment.
