from app.model.base_model import Base
from sqlalchemy import Column, String,Integer
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey

class CityModel(Base):
    __tablename__ = 'cities'
    
    id = Column(Integer, primary_key=True)
    name = Column(String(250), nullable=False)
    department_id = Column(Integer, ForeignKey('departments.id',name='departments_fk'), nullable=False)
    # Relación hacia el padre
    department = relationship("DepartmentModel", back_populates="cities")
    def __repr__(self):
        return f"<CityModel(id={self.id}, name={self.name}, state={self.state}>"
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "deptName": self.department.name if self.department else None
        }