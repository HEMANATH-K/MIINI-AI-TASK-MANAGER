Notes
Backend Design Approach

I used FastAPI to structure the backend with modular routes, taking advantage of APIRouter. Each endpoint has handled a specific CRUD operation from Create to Read, Update, and finally Delete of tasks. This will make the backend organized, easy to maintain, and scalable.

Rationale for Database Schema

I've used SQLAlchemy to define a Task table, which has id, title, description, and created_on. This light schema is effective for managing tasks and is extensible to meet future demands, such as adding users or the priority of tasks.

Search Using AI

Search is keyword-based, matching search terms against task titles and descriptions. This ensures fast, relevant results without heavy computation. It can later be upgraded to NLP-based or embedding-based search for smarter suggestions.

Trade-offs Made

Used  PostgreSQL for a production deployment

Kept the AI search very basic in order to focus on the core functionality of CRUD and UI.

Emphasized simplicity and clarity over functionality in order to meet project deadlines.
