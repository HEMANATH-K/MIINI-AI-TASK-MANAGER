from pydantic import BaseModel
from datetime import datetime
class NotesCreate(BaseModel):
    title: str
    description: str
class NotesUpdate(BaseModel):
    title: str
    description: str

class NotesRead(NotesCreate):
    id: int
    created_on: datetime

    class Config:
        orm_mode = True
