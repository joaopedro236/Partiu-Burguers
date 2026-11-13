from fastapi import APIRouter
from pydantic import BaseModel

from ..Databases.Conn.Orders import connect_database_Order, pool_Order
from ..Databases.Conn.release_database import release_database

router = APIRouter()


class UpdateOrderSequencePayload(BaseModel):
    orderIds: list[int]


@router.post("/updateOrderSequence")
def update_order_sequence(payload: UpdateOrderSequencePayload):
    conn = None
    cursor = None

    if not payload.orderIds:
        return {"Status": False, "Error": "orderIds is required"}

    try:
        conn, cursor = connect_database_Order()

        case_parts = []
        params = []
        for index, order_id in enumerate(payload.orderIds):
            case_parts.append("WHEN %s THEN %s")
            params.extend([order_id, index + 1])

        cursor.execute(
            f"""
            UPDATE Orders
            SET display_order = CASE id
                {' '.join(case_parts)}
                ELSE display_order
            END
            WHERE id IN ({', '.join(['%s'] * len(payload.orderIds))})
            """,
            params + payload.orderIds,
        )
        conn.commit()
        return {"Status": True, "updated": len(payload.orderIds)}
    except Exception as error:
        if conn:
            conn.rollback()
        return {"Status": False, "Error": str(error)}
    finally:
        release_database(conn, cursor, pool_Order)
