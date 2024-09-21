from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import get_cursor

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

@app.get("/show-question")
def show_question(room_id: int = 7777):
    # get current question id by room id
    cursor = get_cursor()
    cursor.execute('SELECT question_id FROM rooms WHERE room_id=?', [room_id])
    question_id = cursor.fetchone()[0]

    # get question text by question id
    cursor.execute('SELECT * FROM questions WHERE question_id=?', [question_id])
    q = cursor.fetchone()

    # convert to json
    result = {"question": q[3], "option1": q[4], "option2": q[5], "option3": q[6], "option4": q[7], "answer": q[8]}

    # print(result)

    return result
