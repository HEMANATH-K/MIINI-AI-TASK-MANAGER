from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
DATABASE_URL="postgresql://postgres:goutham007@Localhost:5432/user_db"
engine=create_engine(DATABASE_URL,echo=True)
Session=sessionmaker(autocommit=False,autoflush=False,bind=engine)
def get_db():
   db=Session()
   try:
     yield db
   finally:
     db.close()



