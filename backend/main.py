from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine
from models import Base

from routes.chat import router as chat_router
from routes.auth import router as auth_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="SRM AI Chatbot API",
    description="Backend API for SRM University AI Chatbot with Authentication",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite frontend
        "http://localhost:3000",  # React frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router, prefix="/api")
app.include_router(auth_router)

@app.get("/")
def root():
    return {
        "message": "SRM Chatbot API is live 🚀"
    }

@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "server": "running"
    }