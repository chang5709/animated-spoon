from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Define allowed origins
origins = [
    "http://127.0.0.1:8000",  # React app or other frontend
    "https://example.com",     # Replace with your domain
]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows specified origins
    allow_credentials=True,  # Allows cookies and authorization headers
    allow_methods=["*"],     # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],     # Allows all headers
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.get("/request-question")
def request_question(room_id: int, question_id: int):
    result = {"question": "2 + 3 * 4 = ?",
    "option1": "14",
    "option2": "20",
    "option3": "18",
    "option4": "11",
    "answer": "option1"}
    return result
