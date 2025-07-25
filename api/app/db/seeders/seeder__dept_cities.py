from app.model.geo.departament import DepartmentModel
from app.model.geo.cities import CityModel
import json
from pathlib import Path
from app.db.session.session import SessionLocal

path_data = Path(__file__).parent.resolve() / 'data' / 'data_geo.json'
print(path_data)
def load_data():
    with open(path_data, 'r', encoding='utf-8') as file:
        data = json.load(file)
    return data

def get_departments_and_cities(data):
    departments = []
    cities = []
    
    for dept in data:
        department = DepartmentModel(name=dept['departament'])
        departments.append(department)
        
        for city in dept['cities']:
            city_model = CityModel(name=city, department=department)
            cities.append(city_model)
    
    return departments, cities

def seed_departments_and_cities():
    session = SessionLocal()
    try:
        data = load_data()
        departments, cities = get_departments_and_cities(data)
        print(f"Seeding {len(departments)} departments and {len(cities)} cities.")
        session.add_all(departments)
        session.commit()
        session.add_all(cities)
        session.commit()
    except Exception as e:
        session.rollback()
        raise
    finally:
        session.close()
        
seed_departments_and_cities()