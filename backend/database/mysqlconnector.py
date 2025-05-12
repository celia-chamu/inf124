import mysql.connector

def db_connection():
    #Return the connection to the database
    return mysql.connector.connect(
        host='zotmarket-database.mysql.database.azure.com',
        user='zotadmin',
        password='@Password',
        database="zotmarket",
        allow_local_infile=True
    )

conn = db_connection()
print(conn)