import os
from dotenv import load_dotenv
from psycopg2.pool import ThreadedConnectionPool
import psycopg2

load_dotenv(encoding="utf-8")
pool_Order = ThreadedConnectionPool(
    minconn=1,
    maxconn=7,
    host=os.getenv("db_host_Order"),
    port=os.getenv("db_post_Order"),
    dbname=os.getenv("db_database_Order"),
    user=os.getenv("db_user_Order"),
    password=os.getenv("db_password_Order"),
    sslmode="require",
)


def connect_database_Order():
    conn = pool_Order.getconn()
    try:
        cursor = conn.cursor()
        return conn, cursor
    except Exception as e:
        return {"Status": False, "Error": str(e)}