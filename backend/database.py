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


def add_listing(id: int,seller: str,title: str,price: float,category: str,item_condition: str,item_description: str,created_at: datetime.datetime) -> bool:
    conn = db_connection()
    cursor = conn.cursor()

    statement = """
        INSERT INTO listings(id, seller, title, price, category, item_condition, item_description, create_at)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """
    values = (id, seller, title, price, category, item_condition, item_description, created_at.timestamp())

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


def add_messages(message_id: int,buyer: str,seller: str,message: list[dict[str,str]]) -> bool:

    conn = db_connection()
    cursor = conn.cursor()

    #Turn message into a JSON object before passing into database
    json_message = json.dump(message)

    statement = """
        INSERT INTO messages(message_id, buyer, seller, message)
        VALUES (%s, %s, %s, %s)
    """
    values = (message_id, buyer, seller, json_message)

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


