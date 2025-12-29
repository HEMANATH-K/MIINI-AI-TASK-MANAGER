from sqlalchemy import Column,Integer,String, DateTime
from datetime import datetime
from sqlalchemy.orm import declarative_base
Base=declarative_base()
class Note(Base):
  __tablename__="notes_table"
  id=Column(Integer,primary_key=True,index=True)
  title=Column(String,nullable=False)
  description=Column(String,nullable=False)
  created_on = Column(DateTime, default=datetime.utcnow)
