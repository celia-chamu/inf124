# uvicorn api:app --reload
# http://127.0.0.1:8000/docs#/

from typing import Optional
from fastapi import FastAPI, HTTPException, Query, Request
import database
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # React dev server, for example
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class User(BaseModel):
    uci_net_id:str
    reputation:float
    join_date:datetime
    first_name:str
    last_name:str
    profile_pic:str

class Listing(BaseModel):
    seller:str
    title:str
    price:float
    category:str
    item_condition:str
    item_description:str
    created_at:datetime
    item_picture:str

class Message(BaseModel):
    conversation_id:int
    sender:str
    content:str
    sent_at:datetime
    has_read:bool

class Conversation(BaseModel):
    conversation_id:int
    seller:str
    buyer:str
    started_at:datetime
    last_message_at:Optional[datetime]
    last_message_preview:Optional[str]

@app.get("/")
async def read_root():
    return {"message": "Hello, world!"}

@app.post("/create-user", response_model=User)
def create_user(user:User):
    print(user)
    database.add_user(user.uci_net_id, user.reputation, user.join_date, user.first_name, user.last_name, user.profile_pic)
    return user

@app.post("/create-listing", response_model=Listing)
def create_listing(listing:Listing):
    print(listing)
    database.add_listing(listing.seller, listing.title, listing.price, listing.category, listing.item_condition, listing.item_description, listing.created_at, listing.item_picture)
    return listing

@app.post("/create-message", response_model=Message)
def create_message(message:Message):
    print(message)
    database.add_message(message.conversation_id, message.sender, message.content, message.sent_at, message.has_read)
    return message

@app.post("/create-conversation", response_model=Conversation)
def create_conversation(conversation:Conversation):
    print(conversation)
    database.add_conversation(conversation.seller, conversation.buyer, conversation.started_at, conversation.last_message_at, conversation.last_message_preview)
    return conversation

@app.get("/read-user", response_model=User)
def read_user(uci_net_id:str):
    print(uci_net_id)
    user = database.get_user(uci_net_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.get("/conversation-exist")
def conversation_exist(seller:str, buyer:str):
    conversation = database.get_conversation(seller, buyer)
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not Found")
    return conversation

@app.get("/fetch-conversations", response_model=list[Conversation])
def fetch_conversations(user:str, type:str):
    conversation = database.find_all_conversation(user, type)
    results = [Conversation(
        conversation_id = row[0],
        seller = row[1],
        buyer = row[2],
        started_at = row[3],
        last_message_at = row[4],
        last_message_preview = row[5]
    ) for row in conversation]
    if not results:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return results

@app.get("/fetch-listings", response_model=list[Listing])
def fetch_listings(): # categories:Optional[list[str]] = Query(None) For passing in categories
    listings = database.fetch_listings()
    results = [Listing(
        id = row[0],
        seller = row[1],
        title= row[2],
        price= row[3],
        category= row[4],
        item_condition= row[5],
        item_description= row[6],
        created_at= row[7],
        item_picture= row[8],
    ) for row in listings]
    return results



@app.get("/fetch-listings-matching", response_model=list[Listing])
def fetch_listings(categories:Optional[list[str]] = Query(None)):
    listings = database.fetch_listings_matching(categories)
    results = [Listing(
        id = row[0],
        seller = row[1],
        title= row[2],
        price= row[3],
        category= row[4],
        item_condition= row[5],
        item_description= row[6],
        created_at= row[7],
        item_picture= row[8],
    ) for row in listings]
    return results