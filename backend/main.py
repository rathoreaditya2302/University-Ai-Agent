from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine
from models import Base
from routes.chat import router as chat_router

# create tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="SRM AI Chatbot API",
    description="Backend API for SRM University AI Chatbot",
    version="1.0.0"
)

# CORS — allow frontend on port 5173
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router, prefix="/api")


@app.get("/")
def root():
    return {"message": "SRM Chatbot API is live 🚀"}