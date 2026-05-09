CATEGORY_KEYWORDS = {
    "courses": [
        "fee", "fees", "course", "branch", "btech", "mtech", "mba", "mca",
        "cse", "ece", "eee", "mechanical", "civil", "it", "aids", "aiml",
        "program", "duration", "cost", "tuition", "scholarship", "waiver",
        "eligibility", "admission fee", "total fee", "per year"
    ],
    "exams": [
        "exam", "midsem", "endsem", "mid semester", "end semester",
        "mid-sem", "end-sem", "test", "schedule", "date", "timetable",
        "attendance", "cgpa", "gpa", "grade", "result", "fail",
        "supplementary", "back", "arrear", "marks"
    ],
    "hostel": [
        "hostel", "accommodation", "mess", "room", "stay", "warden",
        "girls hostel", "boys hostel", "laundry", "wifi in hostel",
        "hostel fee", "hostel facilities"
    ],
    "placements": [
        "placement", "company", "companies", "package", "salary", "job",
        "campus", "recruit", "hiring", "cdc", "lpa", "ctc", "offer",
        "highest package", "average package", "placed", "training"
    ],
    "admissions": [
        "admission", "apply", "deadline", "last date", "documents",
        "srmjeee", "entrance", "register", "registration", "age limit",
        "application", "process", "how to apply", "portal"
    ],
    "general": [
        "contact", "helpline", "phone", "email", "address",
        "bus", "transport", "route", "library", "timing", "support"
    ],
}


def detect_category(question: str) -> str:
    question_lower = question.lower()
    scores = {cat: 0 for cat in CATEGORY_KEYWORDS}

    for category, keywords in CATEGORY_KEYWORDS.items():
        for keyword in keywords:
            if keyword in question_lower:
                scores[category] += 1

    best = max(scores, key=scores.get)
    return best if scores[best] > 0 else "general"