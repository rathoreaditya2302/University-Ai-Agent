# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware

# from database import engine
# from models import Base
# from routes.chat import router as chat_router

# # create tables on startup
# Base.metadata.create_all(bind=engine)

# app = FastAPI(
#     title="SRM AI Chatbot API",
#     description="Backend API for SRM University AI Chatbot",
#     version="1.0.0"
# )

# # CORS — allow frontend on port 5173
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# app.include_router(chat_router, prefix="/api")


# @app.get("/")
# def root():
#     return {"message": "SRM Chatbot API is live 🚀"}

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine
from models import Base

from routes.chat import router as chat_router
from routes.auth import router as auth_router

# Create all database tables
Base.metadata.create_all(bind=engine)

# FastAPI App
app = FastAPI(
    title="SRM AI Chatbot API",
    description="Backend API for SRM University AI Chatbot with Authentication",
    version="1.0.0"
)

# CORS Configuration
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

# Include Routers
app.include_router(chat_router, prefix="/api")
app.include_router(auth_router)

# Root Endpoint
@app.get("/")
def root():
    return {
        "message": "SRM Chatbot API is live 🚀"
    }

# Health Check Endpoint
@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "server": "running"
    }