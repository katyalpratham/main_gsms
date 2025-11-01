# import mysql.connector

# __cnx =    None;
# def get_sql_connection():
#      global __cnx
#      if __cnx is None:
#        __cnx = mysql.connector.connect(
#     host="127.0.0.1", port=3306, user="root",
#     password="KATYAL0786", database ='gs')
#      return __cnx;


import mysql.connector
from mysql.connector import Error
import time

__cnx = None

def get_sql_connection():
    global __cnx
    max_retries = 3
    retry_delay = 2  # seconds
    
    for attempt in range(max_retries):
        try:
            # If connection exists and is still alive, return it
            if __cnx is not None and __cnx.is_connected():
                return __cnx
            
            # Otherwise create new connection
            __cnx = mysql.connector.connect(
                host="127.0.0.1",
                port=3306,
                user="root",
                password="KATYAL0786",
                database="gs",
                charset="utf8mb4",
                collation="utf8mb4_unicode_ci",
                autocommit=True,  # Ensure autocommit is enabled
                connection_timeout=30  # 30 seconds connection timeout
            )
            
            print("✅ Successfully connected to MySQL database")
            return __cnx
            
        except Error as e:
            print(f"❌ Connection attempt {attempt + 1} failed: {e}")
            
            # Close connection if it exists but is broken
            if __cnx is not None:
                __cnx.close()
                __cnx = None
            
            # If not the last attempt, wait before retrying
            if attempt < max_retries - 1:
                print(f"🔄 Retrying in {retry_delay} seconds...")
                time.sleep(retry_delay)
            else:
                print("❌ All connection attempts failed")
                raise e

def close_connection():
    """Close the database connection when application shuts down"""
    global __cnx
    if __cnx is not None and __cnx.is_connected():
        __cnx.close()
        __cnx = None
        print("✅ Database connection closed")

# Optional: Test connection
if __name__ == "__main__":
    try:
        conn = get_sql_connection()
        if conn.is_connected():
            print("✅ Connection test successful!")
            
            # Test query
            cursor = conn.cursor()
            cursor.execute("SELECT VERSION()")
            version = cursor.fetchone()
            print(f"📊 MySQL Server version: {version[0]}")
            cursor.close()
            
    except Error as e:
        print(f"❌ Connection test failed: {e}")
    finally:
        close_connection()
