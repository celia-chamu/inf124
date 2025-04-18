import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI(debug=True)

origins = [
    "http://localhost:3000",
    # Add more origins here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

memory_db = {"fruits": []}

#Used to send data to the frontend
@app.get("/")
def get_fruits():
    return {"message":"Hello World"}

#Used to change data within backend
@app.post("/")
def nothing():
    return None
    

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)