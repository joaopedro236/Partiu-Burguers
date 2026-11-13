from ..Conn.Orders import connect_database_Order


def createDatabaseOrders():
    conn = None
    cursor = None
    try:
        conn, cursor = connect_database_Order()
        cursor.execute("""
        create table if not exists Orders (
        id serial primary key,
        name text, 
        description text,
        image_url text,
        price numeric(10,2),
        type text,
        active boolean,
        display_order integer default 0)""")
        conn.commit()
    except Exception as e:
        if conn:
            conn.rollback()
        return {"Status": False, "Error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
