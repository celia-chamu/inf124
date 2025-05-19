from fastapi import FastAPI
import database
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000"],  # React dev server, for example
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Listing(BaseModel):
    seller:str
    title:str
    price:float
    category:str
    item_condition:str
    item_description:str
    created_at:datetime
    item_picture:str

@app.get("/")
async def read_root():
    return {"message": "Hello, world!"}

@app.post("/create-listing", response_model=Listing)
def create_listing(listing:Listing):
    database.add_listing(listing.seller, listing.title, listing.price, listing.category, listing.item_condition, listing.item_description, listing.created_at, listing.item_picture)
    return {"content":listing}