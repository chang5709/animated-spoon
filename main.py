from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import get_connection, get_cursor

app = FastAPI()

# Allow all CORS origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
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

    try:
        # convert to json
        result = {"question": q[3], "option1": q[4], "option2": q[5], "option3": q[6], "option4": q[7], "answer": q[8]}
    except:
        result = {"question": "遊戲結束", "option1": "", "option2": "", "option3": "", "option4": "", "answer": ""}
    # print(result)

    return result

@app.get('/update-room')
def update_room(room_id: int = 7777):
    '''Update room to prepare next question.'''
    
    # get current question id by room id
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT question_id FROM rooms WHERE room_id=?', [room_id])
    question_id = cursor.fetchone()[0]

    # question id + 1
    next_id = (question_id + 1) if (question_id < 10) else 9999
    cursor.execute('UPDATE rooms SET question_id=? WHERE room_id=?', [next_id, room_id])
    conn.commit()

    return {"message": "ok"}

@app.get("/reset-game")
def reset_game(room_id: int = 7777):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('UPDATE rooms SET question_id=1 WHERE room_id=?', [room_id])
    conn.commit()

    return {"message": "ok"}
