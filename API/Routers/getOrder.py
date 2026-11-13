from fastapi import APIRouter
from ..Databases.Conn.release_database import release_database
from ..Databases.Conn.Orders import connect_database_Order, pool_Order
from fastapi.encoders import jsonable_encoder
from ..Databases.Conn.Redis import redis_client
import json

router = APIRouter()
CACHE_KEY = 'orders:getOrder:v1'
CACHE_TIL = 60


@router.get('/getTrips')
def get_trips():
    conn = None
    cursor = None
    try:
        cached = redis_client.get(CACHE_KEY)
        if cached:
            return json.loads(cached)
    except Exception as e:
        print(f'Redis Error {str(e)}')

    try:
        conn, cursor = connect_database_Order()
        cursor.execute('''
            SELECT id, name, description, image_url, price, type, display_order
            FROM Orders
            WHERE active = true
            ORDER BY CASE LOWER(TRIM(type))
                WHEN 'artesanais' THEN 1
                WHEN 'tradicionais' THEN 2
                WHEN 'combos' THEN 3
                WHEN 'porções' THEN 4
                WHEN 'bebidas' THEN 5
                ELSE 6
            END, COALESCE(display_order, 999999), id ASC
        ''')
        result = cursor.fetchall()
        response = {
            'Status': True,
            'orders': [
                {
                    'id': row[0],
                    'name': row[1],
                    'description': row[2],
                    'image_url': row[3],
                    'price': row[4],
                    'type': row[5],
                    'display_order': row[6]
                }
                for row in result
            ]
        }
        try:
            redis_client.setex(
                CACHE_KEY,
                CACHE_TIL,
                json.dumps(jsonable_encoder(response), ensure_ascii=False)
            )
        except Exception as e:
            print(f"Redis save Error: {str(e)}")
        return response
    except Exception as e:
        return {'Status': False, 'Error': str(e)}
    finally:
        release_database(conn, cursor, pool_Order)
