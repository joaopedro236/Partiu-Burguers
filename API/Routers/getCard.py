from fastapi import APIRouter
from ..Databases.Conn.release_database import release_database
from ..Databases.Conn.Orders import connect_database_Order, pool_Order
from ..Schemas.cartRequest import CartRequest
router = APIRouter()
@router.post('/getCart')
def get_cart(data: CartRequest):
    conn = None
    cursor = None
    try:
        conn, cursor = connect_database_Order()
        ids = data.ids

        if not ids:
            return {'Status': True, 'orders': []}
        placeholders = ', '.join(['%s'] * len(ids))
        cursor.execute(
            f"SELECT  id,name, price, image_url FROM Orders WHERE id IN ({placeholders})",
            tuple(ids)
        )
        result = cursor.fetchall()
        return {
            'Status': True,
            'orders': [
                {
                    'id': row[0],
                    'name': row[1],
                    'price': row[2],
                    'image_url': row[3]
                }
                for row in result
            ]
        }
    except Exception as e:
        return {'Status': False, 'Error': str(e)}
    finally:
        release_database(conn, cursor, pool_Order)