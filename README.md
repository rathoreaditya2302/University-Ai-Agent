# 🎓 University AI Agent

An AI-powered chatbot platform built for **SRM Institute of Science and Technology (SRMIST)** that answers student queries on admissions, courses, exams, hostel life, and placements — instantly and accurately, using a database-backed context pipeline and an LLM for natural-language answers.

<p align="center">
  <img alt="Python" src="https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/Frontend-React%2018-61DAFB?logo=react&logoColor=black">
  <img alt="Vite" src="https://img.shields.io/badge/Bundler-Vite-646CFF?logo=vite&logoColor=white">
  <img alt="PostgreSQL" src="https://img.shields.io/badge/Database-PostgreSQL-4169E1?logo=postgresql&logoColor=white">
</p>

---

## 📖 Overview

University AI Agent is a full-stack conversational assistant that helps prospective and current students get quick, reliable answers about university life without digging through PDFs or waiting on helpline calls.

Instead of relying purely on an LLM's general knowledge (which can hallucinate fees, dates, or policies), the backend first **classifies the question into a category**, **pulls the relevant structured data from PostgreSQL**, and **grounds the LLM's response in that retrieved context** — a lightweight retrieval-augmented generation (RAG) approach purpose-built for a university's FAQ domain.

## ✨ Features

- 💬 **AI Chat Assistant** — natural-language Q&A on courses, admissions, exams, hostel, and placements
- 🎯 **Automatic Category Detection** — keyword-scored intent classifier routes each question to the right data source
- 🗄️ **Context-Grounded Answers** — responses are generated only from real database records, reducing hallucination
- 🔐 **JWT Authentication** — secure register/login flow with hashed passwords and protected routes
- 📊 **Analytics Dashboard** — usage stats, recent queries, top intents, and feedback tracking
- 🧑‍💻 **Admin Panel** — space for managing content and monitoring the chatbot
- 📱 **Responsive UI** — built with React, Tailwind CSS, and Recharts for a modern, mobile-friendly experience
- 🗂️ **CSV-Seeded Database** — university data (courses, exams, hostel, placements, general info) seeded from versioned CSV files for easy updates

## 🏗️ Architecture

```
┌─────────────────┐        REST (JSON)        ┌──────────────────────┐
│   React (Vite)   │ ───────────────────────▶ │      FastAPI          │
│   Frontend        │ ◀─────────────────────── │      Backend          │
└─────────────────┘                            └──────────┬───────────┘
                                                            │
                                    ┌───────────────────────┼───────────────────────┐
                                    ▼                       ▼                       ▼
                          ┌──────────────────┐   ┌───────────────────┐   ┌───────────────────┐
                          │ Category Detector │   │  Context Builder   │   │   PostgreSQL DB    │
                          │  (keyword scoring) │──▶│ (formats DB rows) │◀──│ courses, exams,     │
                          └──────────────────┘   └─────────┬─────────┘   │ hostel, placements, │
                                                            ▼             │ general_info, users │
                                                  ┌───────────────────┐   └───────────────────┘
                                                  │   LLM Service      │
                                                  │ (Groq / Llama 3.3) │
                                                  └───────────────────┘
```

**Request flow:**
1. Student asks a question in the chat UI.
2. `category_detector.py` scores the question against keyword sets to pick a category (`courses`, `exams`, `hostel`, `placements`, `admissions`, `general`).
3. The matching SQLAlchemy model is queried for relevant rows.
4. `context_builder.py` formats those rows into a clean text context block.
5. `gemini_service.py` sends the question + context to an LLM (via the Groq API) and returns a grounded, student-friendly answer.

## 🛠️ Tech Stack

**Backend**
- [FastAPI](https://fastapi.tiangolo.com/) — high-performance Python web framework
- [SQLAlchemy](https://www.sqlalchemy.org/) — ORM for PostgreSQL
- [PostgreSQL](https://www.postgresql.org/) — relational database (via `psycopg2-binary`)
- [python-jose](https://github.com/mpdavis/python-jose) + [passlib](https://passlib.readthedocs.io/) — JWT auth & password hashing
- [Groq API](https://groq.com/) (Llama 3.3 70B) — LLM inference for answer generation
- [Pydantic](https://docs.pydantic.dev/) — request/response validation

**Frontend**
- [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/) — client-side routing
- [Tailwind CSS](https://tailwindcss.com/) — utility-first styling
- [Recharts](https://recharts.org/) — analytics dashboard charts
- [Axios](https://axios-http.com/) — API client
- [Lucide React](https://lucide.dev/) — icon set

## 📁 Project Structure

```
University-Ai-Agent/
├── backend/
│   ├── main.py                  # FastAPI app entrypoint
│   ├── database.py              # SQLAlchemy engine & session setup
│   ├── models.py                # ORM models (Course, ExamSchedule, HostelInfo, ...)
│   ├── schemas.py                # Pydantic request/response schemas
│   ├── seed.py                   # Seeds the DB from CSV files
│   ├── requirements.txt
│   ├── data/                     # Source CSVs (courses, exams, hostel, placements, general info)
│   ├── routes/
│   │   ├── auth.py               # Register / login / me / forgot-password
│   │   └── chat.py               # /api/chat endpoint
│   └── services/
│       ├── category_detector.py  # Keyword-based intent classifier
│       ├── context_builder.py    # Formats DB rows into LLM context
│       └── gemini_service.py     # LLM call (Groq API)
├── frontend/
│   ├── src/
│   │   ├── pages/                # Home, Chatbot, Login, Register, Dashboard, Admin, ...
│   │   ├── components/
│   │   │   ├── auth/              # LoginForm, RegisterForm, AuthModal, OTPBox
│   │   │   ├── chatbot/           # ChatWindow, ChatInput, MessageBubble, VoiceInput, ...
│   │   │   ├── dashboard/         # StatsCard, QueryChart, TopIntents, FeedbackTable
│   │   │   └── layout/            # Navbar, Sidebar, Footer, ProtectedRoute
│   │   ├── context/AuthContext.jsx
│   │   ├── services/api.js
│   │   └── routes.jsx
│   └── package.json
└── admin_dashboard/               # Standalone admin app (in progress)
```

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- A PostgreSQL database
- A [Groq API key](https://console.groq.com/)

### 1. Clone the repository
```bash
git clone https://github.com/rathoreaditya2302/University-Ai-Agent.git
cd University-Ai-Agent
```

### 2. Backend setup
```bash
cd backend
python -m venv venv
source venv/bin/activate      # on Windows: venv\Scripts\activate

pip install -r requirements.txt
pip install python-jose passlib[bcrypt] python-multipart   # required by auth routes
```

Create a `.env` file inside `backend/`:
```env
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<dbname>
GROQ_API_KEY=your_groq_api_key
SECRET_KEY=a-long-random-secret-string
```

Seed the database with the sample university data:
```bash
python seed.py
```

Run the API server:
```bash
uvicorn main:app --reload
```
The API will be live at `http://localhost:8000` (interactive docs at `http://localhost:8000/docs`).

### 3. Frontend setup
```bash
cd ../frontend
npm install
npm run dev
```
The app will be available at `http://localhost:5173`.

## 🔌 API Reference

| Method | Endpoint                | Description                                   | Auth required |
|--------|--------------------------|------------------------------------------------|:---:|
| GET    | `/`                       | API health/status message                      | ❌ |
| GET    | `/health`                 | Health check                                   | ❌ |
| POST   | `/api/chat`                | Ask the chatbot a question                     | ❌ |
| GET    | `/api/health`              | Chat service health check                      | ❌ |
| POST   | `/api/auth/register`       | Create a new account                           | ❌ |
| POST   | `/api/auth/login`          | Log in and receive a JWT                       | ❌ |
| GET    | `/api/auth/me`              | Get current authenticated user                 | ✅ |
| POST   | `/api/auth/forgot-password` | Request a password reset (placeholder)         | ❌ |

**Example — `POST /api/chat`**
```json
// Request
{ "question": "What is the fee for CSE?" }

// Response
{
  "answer": "The B.Tech CSE program at SRM has a fee of ₹3,00,000 per year, with a total fee of ₹12,00,000 over 4 years...",
  "category": "courses",
  "source_count": 6
}
```

## 🗺️ Roadmap

- [ ] Wire up the standalone `admin_dashboard` service
- [ ] Add feedback collection on chatbot answers
- [ ] Expand category coverage (scholarships, clubs, transport)
- [ ] Add response caching for common questions
- [ ] Deploy backend + frontend (Render/Railway + Vercel)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to open a pull request or issue on this repository.

## 👤 Author

**Aditya Rathore**
Computer Science Engineer | Full-Stack Developer