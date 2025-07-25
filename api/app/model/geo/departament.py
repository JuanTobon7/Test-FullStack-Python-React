from app.model.base_model import Base
from sqlalchemy import Column, String,Integer
from sqlalchemy.orm import relationship

class DepartmentModel(Base):
    __tablename__ = 'departments'

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False, unique=True)

    # Relación inversa: una lista de CityModel
    cities = relationship("CityModel", back_populates="department")
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "cities": [city.to_dict() for city in self.cities] if self.cities else []
        }
