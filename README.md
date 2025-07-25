# Test-FullStack-Python-React

You're asking for a README.md for the entire full-stack restaurant reservation project, which consists of a React TypeScript frontend and Flask Python backend in the `JuanTobon7/Test-FullStack-Python-React` repository. <cite/>

# Restaurant Reservation System

A full-stack web application for restaurant discovery and table reservations, built with React TypeScript frontend and Flask Python backend. [1](#1-0) 

## Project Overview

This system enables users to search restaurants by location, availability, and date, then make table reservations with real-time availability checking and business rule enforcement. [2](#1-1) 

## Technology Stack

### Frontend
- **React 18** with TypeScript for type safety
- **Tailwind CSS** for responsive styling  
- **Axios** for API communication
- **React Router** for navigation
- **Custom hooks** for debounced search optimization

### Backend
- **Flask 3.1.1** with CORS support [3](#1-2) 
- **SQLAlchemy 2.0.41** for database ORM
- **PostgreSQL** with psycopg2 driver
- **Alembic** for database migrations
- **Pydantic** for data validation

## Architecture

<img width="1715" height="786" alt="image" src="https://github.com/user-attachments/assets/c9eb88c6-ee1c-4696-b6bc-48bb29c4e41f" />

The application follows a three-tier architecture with clear separation of concerns:

### Frontend Architecture

<img width="1715" height="266" alt="image" src="https://github.com/user-attachments/assets/25bc2fc9-2c96-4c13-99fb-1cfb112c4635" />

- **Component-based** React structure with reusable UI components
- **State management** using React hooks without external libraries
- **Debounced search** to optimize API calls [4](#1-3) 
- **Responsive design** with mobile-first approach

### Backend Architecture  

<img width="1625" height="778" alt="image" src="https://github.com/user-attachments/assets/4fadd5ed-0eb7-444b-ab29-f74de281decf" />


- **Layered architecture**: Routes → Controllers → Services → Models
- **Automatic session management** with request lifecycle handling [5](#1-4) 
- **Blueprint-based routing** for modular endpoint organization [6](#1-5) 

## Key Features

### Restaurant Discovery
- **Advanced search** by name, city, date, and table availability
- **Real-time filtering** with 400ms debounce optimization
- **Responsive grid layout** adapting from 2-4 columns based on screen size

### Reservation System
- **Interactive table selection** with visual availability indicators [7](#1-6) 
- **Business rule enforcement**:
  - Maximum 20 global reservations per day
  - Maximum 15 reservations per restaurant per day  
  - One reservation per table per day [8](#1-7) 

### Data Management
- **Comprehensive error handling** with standardized responses
- **Transaction management** with automatic rollback on failures
- **UUID-based identifiers** for all resources

## Installation & Setup

### Backend Setup
```bash
cd api
pip install -r requirements.txt
alembic upgrade head
python server.py
```

### Frontend Setup  
```bash
cd front
npm install
npm start
```

The backend runs on `http://localhost:5000` and frontend on `http://localhost:3000`. [9](#1-8) 

## API Endpoints

### Restaurant Management
- `GET /api/admin/restaurant` - Search restaurants with filters
- `POST /api/admin/restaurant` - Create new restaurant
- `PUT /api/admin/restaurant/{id}` - Update restaurant
- `DELETE /api/admin/restaurant/{id}` - Delete restaurant

### Reservation Management  
- `GET /api/admin/restaurant/{id}/reservations` - Get restaurant reservations
- `POST /api/admin/restaurant/{id}/reservations` - Create reservation [10](#1-9) 

### Geographic Data
- `GET /api/cities` - Get available cities for filtering

## Component Structure

### Main Components
- **RestaurantSearch**: Main page orchestrating search and reservation flow [11](#1-10) 
- **SideBarSearch**: Advanced filtering interface with debounced inputs
- **ReservationRestaurant**: Interactive table selection and booking interface
- **RestaurantCard**: Individual restaurant display with action buttons

### API Integration
The frontend uses four main API functions for backend communication:
- `getRestaurants()` - Search with dynamic query parameters [12](#1-11) 
- `getReservations()` - Fetch existing reservations for date validation
- `createReservation()` - Submit new reservations with error handling
- `getDeptCities()` - Load geographic data for filtering

## Business Logic

### Search Optimization
- **Debounced text input** (300ms) prevents excessive API calls
- **Combined search parameters** (400ms) for final query execution
- **Error recovery** with graceful fallbacks to empty states

### Reservation Validation
The system enforces strict business rules through database-level validation:
- **Table availability** checking prevents double-booking
- **Daily limits** ensure fair resource allocation  
- **Restaurant capacity** management maintains service quality

## Environment Configuration

### Backend Environment
- `PORT`: Server port (default: 5000)
- Database connection settings via Config class
- CORS enabled for frontend communication [13](#1-12) 

### Frontend Environment  
- API base URL configuration
- Development server with hot reload
- Production build optimization

## Notes

This full-stack application demonstrates modern web development practices with TypeScript for type safety, responsive design principles, and robust error handling. The system is designed for scalability with modular architecture and clear separation between frontend presentation and backend business logic. The reservation system implements real-world business constraints while maintaining a smooth user experience through optimized search and intuitive table selection interfaces.

Wiki pages you might want to explore:
- [System Architecture (JuanTobon7/Test-FullStack-Python-React)](/wiki/JuanTobon7/Test-FullStack-Python-React#2)
- [Reservation Management System (JuanTobon7/Test-FullStack-Python-React)](/wiki/JuanTobon7/Test-FullStack-Python-React#3.2)
- [Frontend Application (JuanTobon7/Test-FullStack-Python-React)](/wiki/JuanTobon7/Test-FullStack-Python-React#4)
