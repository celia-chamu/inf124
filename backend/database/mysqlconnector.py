import mysql.connector
import os

def db_connection():
    #Return the connection to the database
    print(os.getenv("DB_USER"))
    print(os.getenv("DB_PASSWORD"))
    return mysql.connector.connect(
        host='localhost',
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database="zotmarket",
        allow_local_infile=True
    )

conn = db_connection()
print(conn)