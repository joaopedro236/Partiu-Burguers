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
        select name, description, image_url, price, type, active from Orders''')
        result = cursor.fetchall()
        response = {'Status': True, 'name': result[0], 'description': result[1], 'image_url': result[2], 'price': result[3], 'type': result[4], 'active': result[5]}
        try:
            redis_client.setex(
                CACHE_KEY,
                CACHE_TIL,
                json.dumps(
                    jsonable_encoder(response),
                    ensure_ascii=False
                )
            )
        except Exception as e:
            print(f"Redis save Error: {str(e)}")
        return response
    except Exception as e:
        return{'Status': False, 'Error': str(e)}
    finally:
        release_database(conn, cursor, pool_Order)