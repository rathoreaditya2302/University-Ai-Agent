import os
import requests
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"



def get_gemini_answer(question: str, context: str) -> str:
    if not context:
        return "I don't have information on that. Please contact the university helpline at 1800-102-1525."

    prompt = f"""You are a helpful university assistant for SRM Institute of Science and Technology.
Answer the student's question using ONLY the context provided below.
If the answer is not in the context, say: "I don't have information on that. Please contact the university helpline at 1800-102-1525."
Keep your answer clear, friendly and concise.

--- CONTEXT ---
{context}
--- END CONTEXT ---

Student Question: {question}

Answer:"""

    try:
        response = requests.post(
            GROQ_URL,
            headers={
                "Authorization": f"Bearer {GROQ_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "llama-3.3-70b-versatile",
                "messages": [{"role": "user", "content": prompt}],
                "max_tokens": 300
            }
        )
        data = response.json()
        return data["choices"][0]["message"]["content"].strip()
    except Exception as e:
        print(f"❌ Groq Error: {e}")
        return "Something went wrong. Please try again later."