from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models import Course, ExamSchedule, HostelInfo, PlacementData, GeneralInfo
from schemas import ChatRequest, ChatResponse
from services.category_detector import detect_category
from services.context_builder import build_context
from services.gemini_service import get_gemini_answer

router = APIRouter()

TABLE_MAP = {
    "courses":    Course,
    "exams":      ExamSchedule,
    "hostel":     HostelInfo,
    "placements": PlacementData,
    "admissions": GeneralInfo,
    "general":    GeneralInfo,
}


@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest, db: Session = Depends(get_db)):
    question = request.question.strip()

    category = detect_category(question)

    model_class = TABLE_MAP.get(category, GeneralInfo)

    if category in ("admissions", "general"):
        rows = db.query(GeneralInfo).filter(GeneralInfo.category == category).all()
    else:
        rows = db.query(model_class).all()

    context = build_context(category, rows)

    answer = get_gemini_answer(question, context)

    return ChatResponse(
        answer=answer,
        category=category,
        source_count=len(rows)
    )


@router.get("/health")
def health():
    return {"status": "ok", "message": "SRM Chatbot API is running"}