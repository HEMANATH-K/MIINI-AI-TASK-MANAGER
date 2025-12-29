Overview

MIINI AI Task Manager is a full-stack web application to efficiently manage tasks. The backend is built with FastAPI (Python) and the frontend uses React.js.

Setup Steps
Backend

Navigate to the backend folder: cd backend

Create and activate a virtual environment:

python -m venv venv

source venv/bin/activate (Linux/Mac)

venv\Scripts\activate (Windows)

Install dependencies: pip install -r requirements.txt

Run the backend server: uvicorn main:app --reload
Access the API at http://127.0.0.1:8000

Frontend

Navigate to the frontend folder: cd frontend

Install dependencies: npm install

Start the frontend: npm start
Access the app at http://localhost:3000

Dependencies

Backend: FastAPI, SQLAlchemy, Uvicorn, Pydantic
Frontend: React.js, Axios, React Router DOM
