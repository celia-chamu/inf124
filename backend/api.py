# fastapi dev api.py
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
    allow_origins=["http://localhost:3000", "https://zot-market.vercel.app"],  # or ["*"] for all origins (dev only)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class ProfileImageUpdate(BaseModel):
    uci_net_id: str
    image: str

class User(BaseModel):
    uci_net_id:str
    reputation:float
    join_date:datetime
    full_name:str
    profile_pic:str

class Listing(BaseModel):
    id: Optional[int]
    seller:str
    title:str
    price:float
    category:str
    item_condition:str
    item_description:str
    images: Optional[str]
    created_at:datetime

class ItemPicture(BaseModel):
    id:int
    item_picture:str
    listingid: int

class Message(BaseModel):
    message_id:int
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
    database.add_user(user.uci_net_id, user.reputation, user.join_date, user.full_name, user.profile_pic)
    return user

@app.post("/create-listing", response_model=Listing)
def create_listing(listing: Listing):
    print(listing)
    new_id = database.add_listing(
        listing.seller,
        listing.title,
        listing.price,
        listing.category,
        listing.item_condition,
        listing.item_description,
        listing.created_at
    )
    return Listing(
        id=new_id,
        seller=listing.seller,
        title=listing.title,
        price=listing.price,
        category=listing.category,
        item_condition=listing.item_condition,
        item_description=listing.item_description,
        created_at=listing.created_at,
        images=listing.images
    )

@app.post("/add-picture")
def add_picture(itemPicture: ItemPicture):
    print(itemPicture)
    database.add_itemPictures(itemPicture.item_picture, itemPicture.listingid)
    return itemPicture

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

@app.get("/check-user", response_model=User)
def read_user(uci_net_id:str):
    print(uci_net_id)
    user = database.get_user(uci_net_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.get("/fetch-profileImage")
def fetch_profileImage(uci_net_id:str):
    profileImage = database.fetch_profileImage(uci_net_id)
    return profileImage

@app.put("/update-profileImage")
def update_profileImage(update: ProfileImageUpdate):
    success = database.update_profileImage(update.uci_net_id, update.image)
    if not success:
        raise HTTPException(status_code=404, detail="Profile change failed")
    return success

@app.get("/fetch-profileImage")
def fetch_profileImage(uci_net_id:str):
    image = database.fetch_profileImage(uci_net_id)
    if not image:
        raise HTTPException(status_code=404, detail="User not found")
    return image

@app.put("/update-last-message")
def update_lastMessage(convo:Conversation):
    success= database.update_lastMessage(convo.conversation_id, convo.last_message_preview, convo.last_message_at)
    if not success:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return success

@app.get("/conversation-exist")
def conversation_exist(seller:str, buyer:str):
    conversation = database.get_conversation(seller, buyer)
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
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

@app.get("/fetch-messages", response_model=list[Message])
def fetch_messages(conversation_id:int):
    messages = database.fetch_message(conversation_id)
    print(messages)
    results = [Message(
        message_id = row[0],
        conversation_id = row[1],
        sender = row[2],
        content = row[3],
        sent_at = row[4],
        has_read = row[5]
        ) for row in messages]
    return results

@app.get("/fetch-listings", response_model=list[Listing])
def fetch_listings(search: Optional[str] = Query(None), category: Optional[str] = Query(None)): # categories:Optional[list[str]] = Query(None) For passing in categories
    listings = database.fetch_listings(search, category)
    if listings:
        results = [Listing(
            id = row[0],
            seller = row[1],
            title = row[2],
            price = row[3],
            category = row[4],
            item_condition = row[5],
            item_description = row[6],
            created_at = row[7],
            images = row[8],
        ) for row in listings]
    else:
        results = []
    return results

@app.get("/fetch-listing", response_model=Listing)
def fetch_listing(id: int):
    listing = database.fetch_listing(id)
    if listing:
        results = Listing(
            id = listing[0],
            seller = listing[1],
            title = listing[2],
            price = listing[3],
            category = listing[4],
            item_condition = listing[5],
            item_description = listing[6],
            created_at = listing[7],
            images = listing[8],
        )
    else:
        raise HTTPException(status_code=404, detail="Listing not found")
    return results

@app.get("/fetch-listings-sold-by", response_model=list[Listing])
def fetch_listings_sold_by(seller: str): # categories:Optional[list[str]] = Query(None) For passing in categories
    listings = database.fetch_listings_sold_by(seller)
    if listings:
        results = [Listing(
            id = row[0],
            seller = row[1],
            title = row[2],
            price = row[3],
            category = row[4],
            item_condition = row[5],
            item_description = row[6],
            created_at = row[7],
            images = row[8],
        ) for row in listings]
    else:
        results = []
    return results

@app.get("/fetch-pictures")
def fetch_pictures(listingid: int):
    try:
        images = database.fetch_item_pictures_by_listingid(listingid)
        if not images:
            return []
        return [
            {"id": row[0], "item_picture": row[1], "listingid": row[2]}
            for row in images
        ]
    except Exception as e:
        print(f"Error fetching pictures for listing {listingid}: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch images")
    
@app.delete("/delete-message/{conversation_id}/{message_id}", response_model=bool)
def delete_message(conversation_id: int, message_id: int):
    success = database.delete_message(conversation_id, message_id)
    if not success:
        raise HTTPException(status_code=404, detail="Message not found in given conversation")
    return True

@app.delete("/delete-listing/{listing_id}", response_model=bool)
def delete_listing(listing_id: int):
    success = database.delete_listing(listing_id)
    if not success:
        raise HTTPException(status_code=404, detail="Listing not found")
    return True