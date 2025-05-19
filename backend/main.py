from database import add_listing
from api import Listing
from database import add_user
from datetime import datetime
from api import User

new_user = User(
    uci_net_id = "rudyx@uci.edu",
    reputation = 4.5,
    join_date = datetime.now(),
    first_name = "Rudy",
    last_name = "Xie",
    profile_pic = "None"

)

new_listing = Listing(
    seller="rudyx@uci.edu",
    title="Lamp",
    price=50.00,
    category="Furniture",
    item_condition="Good",
    item_description="Nothing",
    created_at=datetime.now(),  # ← use datetime object directly
    item_picture="NONE"
)

print(new_listing.created_at)
print(new_user.join_date)
add_user(new_user.uci_net_id, new_user.reputation, new_user.join_date, new_user.first_name, new_user.last_name, new_user.profile_pic)
add_listing(new_listing.seller, new_listing.title, new_listing.price, new_listing.category, new_listing.item_condition, new_listing.item_description, new_listing.created_at, new_listing.item_picture)
