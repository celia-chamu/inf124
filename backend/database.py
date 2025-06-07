import datetime
import mysql.connector


def db_connection():
    return mysql.connector.connect(
        host='zotmarket-database.mysql.database.azure.com',
        user='zotadmin',
        password='@Password',
        database="zotmarket",
        allow_local_infile=True
    )

def add_user(uci_net_id:str, reputation:float, join_date:datetime.datetime, full_name:str, profile_pic:str) -> bool:
    #Connect to database
    conn = db_connection()
    cursor = conn.cursor()

    #MySQL Statement
    statement = """
        INSERT INTO users(uci_net_id, reputation, join_date, full_name, profile_pic)
        VALUES (%s, %s, %s, %s, %s)
    """
    values = (
        uci_net_id,
        reputation,
        join_date,  # converts datetime to float
        full_name,
        profile_pic
    )
    try:
        #Execute statements and commit changes
        cursor.execute(statement, values)
        conn.commit()
        return True
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return False
    finally:
        #Close connection to database
        cursor.close()
        conn.close()

def add_itemPictures(item_picture:str, id:int):
    conn = db_connection()
    cursor = conn.cursor()

    statement = """
        INSERT INTO itemPictures(item_picture, listingid)
        VALUES( %s, %s)
    """
    values = (item_picture, id)
    try:
        cursor.execute(statement, values)
        conn.commit()
        return True
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return False
    finally:
        cursor.close()
        conn.close()

def add_listing(seller:str, title:str, price:float, category:str, item_condition:str, item_description:str, created_at:datetime.datetime) -> bool:
    conn = db_connection()
    cursor = conn.cursor()

    statement = """
        INSERT INTO listings(seller, title, price, category, item_condition, item_description, created_at)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """
    values = ( seller, title, price, category, item_condition, item_description, created_at)

    try:
        cursor.execute(statement, values)
        conn.commit()
        return cursor.lastrowid 
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return False
    finally:
        cursor.close()
        conn.close()

def add_message(conversation_id:int, sender:str, content:str, sent_at:datetime, has_read:bool) -> bool:
    conn = db_connection()
    cursor = conn.cursor()

    statement = """
        INSERT INTO messages(conversation_id, sender, content, sent_at, has_read)
        VALUES (%s, %s, %s, %s, %s)
    """
    values = (conversation_id, sender, content, sent_at, has_read)

    try:
        cursor.execute(statement, values)
        conn.commit()
        return True
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return False
    finally:
        cursor.close()
        conn.close()

def fetch_message(conversation_id:int):
    conn = db_connection()
    cursor = conn.cursor()

    statement = """
        SELECT * FROM messages
        WHERE conversation_id = %s
        ORDER BY sent_at ASC
    """
    values = (conversation_id, )
    try:
        cursor.execute(statement, values)
        messages = cursor.fetchall()
        return messages
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return False
    finally:
        cursor.close()
        conn.close()

def add_conversation(seller:str, buyer:str, started_at:datetime, last_message_at:datetime, last_message_preview:datetime):
    conn = db_connection()
    cursor = conn.cursor()

    statement = """
                INSERT INTO conversations(seller, buyer, started_at, last_message_at, last_message_preview)
                VALUES (%s, %s, %s, %s, %s)
    """
    values = (seller, buyer, started_at, last_message_at, last_message_preview)

    try:
        cursor.execute(statement, values)
        conn.commit()
        return True
    except mysql.connector.Error as err:
        print(f"Error {err}")
        return False
    finally:
        cursor.close()
        conn.close()

def find_all_conversation(user:str, type:str):
    conn = db_connection()
    cursor = conn.cursor()

    if type == "buyer":
        statement = """
                    SELECT *
                    FROM conversations
                    WHERE (buyer = %s)
                    ORDER BY last_message_at DESC
        """
    else:
        statement = """
                    SELECT *
                    FROM conversations
                    WHERE (seller = %s)
                    ORDER BY last_message_at DESC
        """
    values = (user,)

    try:
        cursor.execute(statement,values)
        conversations = cursor.fetchall()
        return conversations
    except mysql.connector.Error as error:
        print(f"Error:{error}")
        return False
    finally:
        cursor.close()
        conn.close()

def get_conversation(seller:str, buyer:str):
    conn = db_connection()
    cursor = conn.cursor()

    statement = """
                SELECT *
                FROM conversations
                WHERE ((seller = %s and buyer = %s)
                OR (seller = %s and buyer = %s))
    """

    values = (seller, buyer, buyer, seller)
    try:
        cursor.execute(statement, values)
        conversation = cursor.fetchall()
        return conversation
    except mysql.connector.Error as err:
        print(f"Error{err}")
        return False
    finally:
        cursor.close()
        conn.close()

def get_user(uci_net_id:str):
    conn = db_connection()
    cursor = conn.cursor(dictionary=True)

    statement = """
                SELECT *
                FROM users
                WHERE uci_net_id = %s
    """
    
    try:
        cursor.execute(statement, (uci_net_id, ))
        user = cursor.fetchone()
        return user
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None
    finally:
        cursor.close()
        conn.close()

def fetch_listings(search: str | None, category: str | None):
    conn = db_connection()
    cursor = conn.cursor()

    conditions = {"search": "title LIKE %s", "category": "category = %s"}
    clauses = {"search": "%%%s%%" % (search), "category": category}

    try:
        cursor.execute("SET SESSION group_concat_max_len = 100000000000;")
        conn.commit()
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None
    
    statement = """
                SELECT l.*, GROUP_CONCAT(i.item_picture ORDER BY i.item_picture SEPARATOR ', ') AS images
                FROM listings l
                LEFT JOIN itemPictures i ON l.id = i.listingid
    """
    if (search or category):
        statement += " WHERE "
        if (search and category):
            statement += conditions["search"] + " AND " + conditions["category"]
        else:
            statement += conditions["search"] if search else conditions["category"]
        
    statement += "GROUP BY l.id"

    filters = tuple(clauses[x] for (x, y) in [("search", search), ("category", category)] if y)

    try:
        cursor.execute(statement, filters) 
        listings = cursor.fetchall()
        return listings
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None
    finally:
        cursor.close()
        conn.close()

def fetch_listing(id: int):
    conn = db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("SET SESSION group_concat_max_len = 100000000000;")
        conn.commit()
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None

    statement = """
                SELECT l.*, GROUP_CONCAT(i.item_picture ORDER BY i.item_picture SEPARATOR ', ') AS images
                FROM listings l
                LEFT JOIN itemPictures i ON l.id = i.listingid
                WHERE l.id = %s
                GROUP BY l.id
    """

    try:
        cursor.execute(statement, (id, )) 
        listings = cursor.fetchone()
        return listings
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None
    finally:
        cursor.close()
        conn.close()

def fetch_listings_sold_by(seller: str):
    conn = db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("SET SESSION group_concat_max_len = 100000000000;")
        conn.commit()
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None

    statement = """
                SELECT l.*, GROUP_CONCAT(i.item_picture ORDER BY i.item_picture SEPARATOR ', ') AS images
                FROM listings l
                LEFT JOIN itemPictures i ON l.id = i.listingid
                WHERE l.seller = %s
                GROUP BY l.id
    """

    try:
        cursor.execute(statement, (seller, )) 
        listings = cursor.fetchall()
        return listings
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None
    finally:
        cursor.close()
        conn.close()
        
def fetch_item_pictures_by_listingid(listingid: int):
    conn = db_connection()
    cursor = conn.cursor()
    query = "SELECT id, item_picture, listingid FROM itemPictures WHERE listingid = %s"
    cursor.execute(query, (listingid,))
    results = cursor.fetchall()
    cursor.close()
    conn.close()
    return results  


def delete_message(conversation_id: int, message_id: int):
    conn = db_connection()
    cursor = conn.cursor()

    statement = """
        DELETE FROM messages
        WHERE id = %s AND conversation_id = %s
    """

    try:
        cursor.execute(statement, (message_id, conversation_id))
        conn.commit()
        return cursor.rowcount > 0 # True if something was deleted
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return False
    finally:
        cursor.close()
        conn.close()

def update_profileImage(uci_net_id:str, image:str):
    conn = db_connection()
    cursor = conn.cursor()

    statement = """
        UPDATE users
        SET profile_pic = %s
        WHERE uci_net_id = %s
    """
    values = (image, uci_net_id)

    try:
        cursor.execute(statement, values)
        conn.commit()
        return True
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return False
    finally:
        cursor.close()
        conn.close()

def fetch_profileImage(uci_net_id:str):
    conn = db_connection()
    cursor = conn.cursor()

    statement = """
        SELECT profile_pic from users
        WHERE uci_net_id = %s
    """

    values = (uci_net_id,)

    try:
        cursor.execute(statement,values)
        image = cursor.fetchall()
        return image
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return False
    finally:
        cursor.close()
        conn.close()

def update_lastMessage(convo_id:int, last_message:str, last_message_time: datetime):
    conn = db_connection()
    cursor = conn.cursor()

    statement = """
        UPDATE conversations
        SET last_message_preview = %s, last_message_at = %s
        WHERE conversation_id = %s
    """

    values = (last_message, last_message_time, convo_id)

    try:
        cursor.execute(statement, values)
        conn.commit()
        return True
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return False
    finally:
        cursor.close()
        conn.close()