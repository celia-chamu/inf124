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


def add_user(uci_net_id:str, reputation:float, join_date:datetime.datetime, first_name:str, last_name:str, profile_pic:str) -> bool:
    #Connect to database
    conn = db_connection()
    cursor = conn.cursor()

    #MySQL Statement
    statement = """
        INSERT INTO users(uci_net_id, reputation, join_date, first_name, last_name, profile_pic)
        VALUES (%s, %s, %s, %s, %s, %s)
    """

    values = (
        uci_net_id,
        reputation,
        join_date,  # converts datetime to float
        first_name,
        last_name,
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


def add_listing(seller:str, title:str, price:float, category:str, item_condition:str, item_description:str, created_at:datetime.datetime, item_picture:str) -> bool:
    conn = db_connection()
    cursor = conn.cursor()

    statement = """
        INSERT INTO listings(seller, title, price, category, item_condition, item_description, created_at, item_picture)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """
    values = ( seller, title, price, category, item_condition, item_description, created_at, item_picture)

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
        ORDER BY sent_at DESC
    """

    try:
        cursor.execute(statement, (conversation_id,))
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
    print(values)

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
    
    statement = """
                SELECT *
                FROM listings
    """
    if (search or category):
        statement += " WHERE "
        if (search and category):
            statement += conditions["search"] + " AND " + conditions["category"]
        else:
            statement += conditions["search"] if search else conditions["category"]

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