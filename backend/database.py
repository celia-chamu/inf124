import datetime
import mysql.connector
import json

def db_connection():
    return mysql.connector.connect(
        host='zotmarket-database.mysql.database.azure.com',
        user='zotadmin',
        password='@Password',
        database="zotmarket",
        allow_local_infile=True
    )


def add_user(uci_net_id: str,reputation: float,join_date: datetime.datetime,first_name: str,last_name: str,profile_pic: bytes) -> bool:

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
        join_date.timestamp(),  # converts datetime to float
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


def add_listing(id: int,seller: str,title: str,price: float,category: str,item_condition: str,item_description: str,created_at: datetime.datetime, item_picture:str) -> bool:
    conn = db_connection()
    cursor = conn.cursor()

    statement = """
        INSERT INTO listings(id, seller, title, price, category, item_condition, item_description, create_at, item_picture)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    values = (id, seller, title, price, category, item_condition, item_description, created_at.timestamp(), item_picture)

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


def add_messages(message_id: int,conversation_id: int,sender: str,content: str, sent_at:datetime, has_read:bool) -> bool:

    conn = db_connection()
    cursor = conn.cursor()


    statement = """
        INSERT INTO messages(message_id, conversation_id, sender, content, sent_at, has_read)
        VALUES (%s, %s, %s, %s, %s, %s)
    """
    values = (message_id, conversation_id, sender, content, sent_at, has_read)

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

def add_conversation(conversation_id:int, user1_net_id:str, user2_net_id:str, start_at:datetime, last_message_at:datetime, last_message_preview:datetime, inbox_type: str):

    conn = db_connection()
    cursor = conn.cursor()


    statement = """
                INSERT INTO conversations(conversation_id, user1_net_id, user2_net_id, start_at, last_message_at, last_message_preview, inbox_type)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
    """
    values = (conversation_id, user1_net_id, user1_net_id, start_at, last_message_at, last_message_preview)

    try:
        cursor.execute(statement,values)
        conn.commit()
        return True
    except mysql.connector.Error as err:
        print(f"Error {err}")
        return False
    finally:
        cursor.close()
        conn.close()


