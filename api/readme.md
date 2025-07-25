# Restaurant Reservation Backend API

A Flask-based REST API for managing restaurant reservations with comprehensive business rule validation and PostgreSQL database integration. [1](#0-0) 

## Technology Stack

- **Framework**: Flask 3.1.1 with CORS support [2](#0-1) 
- **Database**: PostgreSQL with SQLAlchemy 2.0.41 ORM [3](#0-2) 
- **Migrations**: Alembic 1.16.4 for database versioning [4](#0-3) 
- **Validation**: Pydantic 2.11.7 for data validation [5](#0-4) 

## Architecture

The backend follows a layered architecture pattern:
- **Routes Layer**: Flask Blueprints for endpoint definitions [6](#0-5) 
- **Controller Layer**: Request/response handling and HTTP concerns [7](#0-6) 
- **Service Layer**: Business logic and validation [8](#0-7) 
- **Model Layer**: SQLAlchemy models and DTOs [9](#0-8) 

## Installation

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set up your PostgreSQL database and configure connection settings

3. Run database migrations:
```bash
alembic upgrade head
```
4. Run seeding

## Running the Application

Start the development server: [10](#0-9) 
```bash
python server.py
```



## Database Seeding

Before using the application, you need to run the seeder to populate the database with initial geodata. [1](#0-0) 

### Run the Seeder

The system includes a seeder for departments and cities of Colombia that must be executed after the migrations:

````bash
# After running the migrations
alembic upgrade head

# Run the geodata seeder
python api/app/db/seeders/seeder__dept_cities.py
````

### Seeder data

The seeder loads geographic data from a JSON file containing: [2](#0-1) 

- Departments**: 32 departments of Colombia
- **Cities**: More than 1,000 cities associated to their respective departments [3](#0-2) 

The seeder uses its own independent database session and automatically handles transactions with rollback in case of error. [4](#0-3) 

### Recommended Order of Execution

````bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Configure PostgreSQL database

# 3. Run migrations
alembic upgrade head

# 4. Run seeder (IMPORTANT)
python api/app/db/seeders/seeder__dept_cities.py

# 5. Start server
python server.py
````

## Notes

El seeder es esencial para el funcionamiento correcto de la aplicación ya que los datos geográficos son requeridos por el sistema de búsqueda de restaurantes. <cite/> Sin ejecutar el seeder, las funcionalidades relacionadas con ubicaciones geográficas no funcionarán correctamente. <cite/>

Wiki pages you might want to explore:
- [System Architecture (JuanTobon7/Test-FullStack-Python-React)](/wiki/JuanTobon7/Test-FullStack-Python-React#2)
- [Reservation Management System (JuanTobon7/Test-FullStack-Python-React)](/wiki/JuanTobon7/Test-FullStack-Python-React#3.2)"

The API will be available at `http://localhost:5000/api`

## API Endpoints

### Reservation Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/admin/restaurant/{id}/reservations` | Get reservations for a restaurant |
| `POST` | `/admin/restaurant/{id}/reservations` | Create a new reservation | [11](#0-10) 

### Restaurant Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/admin/restaurant` | Get all restaurants with filters |
| `POST` | `/admin/restaurant` | Create a new restaurant |
| `PUT` | `/admin/restaurant/{id}` | Update a restaurant |
| `DELETE` | `/admin/restaurant/{id}` | Delete a restaurant | [12](#0-11) 

## Business Rules

The reservation system enforces strict booking limits: [13](#0-12) 

- **Table Uniqueness**: Each table can only have one reservation per day
- **Global Daily Limit**: Maximum 20 reservations system-wide per day
- **Restaurant Daily Limit**: Maximum 15 reservations per restaurant per day

## Database Session Management

The application implements automatic session management: [14](#0-13) 

- Sessions are created automatically for each request
- Automatic commit on successful operations
- Automatic rollback on exceptions
- Proper connection cleanup after each request

## Error Handling

All endpoints return standardized error responses: [15](#0-14) 

```json
{
  "status": "error",
  "message": "Error description",
  "data": {}
}
```

## Environment Variables

- `PORT`: Server port (default: 5000)
- Database connection settings (configure in your Config class)

## Notes

This backend is designed to work with a React frontend and includes CORS support for cross-origin requests. [16](#0-15)  The API uses UUID-based identifiers for all resources and implements comprehensive validation using Pydantic DTOs. [17](#0-16) 

