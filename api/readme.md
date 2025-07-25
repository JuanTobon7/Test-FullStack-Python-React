Restaurant Reservation Backend API
A Flask-based REST API for managing restaurant reservations with comprehensive business rule validation and PostgreSQL database integration. server.py:1-7

Technology Stack
Framework: Flask 3.1.1 with CORS support requirements.txt:11-13
Database: PostgreSQL with SQLAlchemy 2.0.41 ORM requirements.txt:29-37
Migrations: Alembic 1.16.4 for database versioning requirements.txt:1
Validation: Pydantic 2.11.7 for data validation requirements.txt:31-33
Architecture
The backend follows a layered architecture pattern:

Routes Layer: Flask Blueprints for endpoint definitions reservation_restaurant_routes.py:6
Controller Layer: Request/response handling and HTTP concerns reservation_controller.py:8
Service Layer: Business logic and validation reservation_service.py:11
Model Layer: SQLAlchemy models and DTOs reservation_service.py:2-3
Installation
Install dependencies:
pip install -r requirements.txt
Set up your PostgreSQL database and configure connection settings

Run database migrations:

alembic upgrade head
Running the Application
Start the development server: server.py:30-31

python server.py
The API will be available at http://localhost:5000/api

API Endpoints
Reservation Management
Method	Endpoint	Description
GET	/admin/restaurant/{id}/reservations	Get reservations for a restaurant
POST	/admin/restaurant/{id}/reservations	Create a new reservation
Restaurant Management
Method	Endpoint	Description
GET	/admin/restaurant	Get all restaurants with filters
POST	/admin/restaurant	Create a new restaurant
PUT	/admin/restaurant/{id}	Update a restaurant
DELETE	/admin/restaurant/{id}	Delete a restaurant
Business Rules
The reservation system enforces strict booking limits: reservation_service.py:77-84

Table Uniqueness: Each table can only have one reservation per day
Global Daily Limit: Maximum 20 reservations system-wide per day
Restaurant Daily Limit: Maximum 15 reservations per restaurant per day
Database Session Management
The application implements automatic session management: server.py:16-28

Sessions are created automatically for each request
Automatic commit on successful operations
Automatic rollback on exceptions
Proper connection cleanup after each request
Error Handling
All endpoints return standardized error responses: reservation_controller.py:16-21

{  
  "status": "error",  
  "message": "Error description",  
  "data": {}  
}
Environment Variables
PORT: Server port (default: 5000)
Database connection settings (configure in your Config class)
Notes
This backend is designed to work with a React frontend and includes CORS support for cross-origin requests. server.py:9 The API uses UUID-based identifiers for all resources and implements comprehensive validation using Pydantic DTOs. reservation_service.py:41

Wiki pages you might want to explore:

System Architecture (JuanTobon7/Test-FullStack-Python-React)
Reservation Management System (JuanTobon7/Test-FullStack-Python-React)
