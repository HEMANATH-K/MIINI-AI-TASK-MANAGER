from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import Note
from schemas import NotesCreate, NotesRead, NotesUpdate
from database import get_db
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
router = APIRouter(prefix="/user", tags=["users"])
model = SentenceTransformer('all-MiniLM-L6-v2')
@router.get("/notes", response_model=list[NotesRead])
def read_notes(db: Session = Depends(get_db)):
    notes = db.query(Note).all()
    return notes
@router.post("/createnotes", response_model=NotesRead)
def create_notes(note: NotesCreate, db: Session = Depends(get_db)):
    db_note = Note(**note.dict())
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note
@router.put("/update_notes/{title}", response_model=NotesRead)
def update_notes(title: str, note: NotesUpdate, db: Session = Depends(get_db)):
    db_note = db.query(Note).filter(Note.title == title).first()
    if not db_note:
        raise HTTPException(status_code=404, detail="Note not found")
    db_note.title = note.title
    db_note.description = note.description
    db.commit()
    db.refresh(db_note)
@router.get("/search_notes", response_model=list[NotesRead])
def search_notes(q: str, db: Session = Depends(get_db)):
    notes = db.query(Note).all()
    if not notes:
        raise HTTPException(status_code=404, detail="Notes not found")
    text_data = [f"{note.title} {note.description}" for note in notes]
    note_embeddings = model.encode(text_data)
    user_embedding = model.encode([q])
    similarity_scores = cosine_similarity(user_embedding, note_embeddings)[0]
    note_with_scores = list(zip(notes, similarity_scores))
    top_notes = sorted(note_with_scores, key=lambda x: x[1], reverse=True)[:5]
    return [NotesRead(id=n.id, title=n.title, description=n.description, created_on=n.created_on) for n, _ in top_notes]
@router.delete("/delete_notes/{title}", response_model=dict)
def delete_note(title: str, db: Session = Depends(get_db)):
    db_note = db.query(Note).filter(Note.title == title).first()
    if not db_note:
        raise HTTPException(status_code=404, detail="Note not found")
    db.delete(db_note)
    db.commit()
    return {"message": f"Note '{title}' deleted successfully"}


