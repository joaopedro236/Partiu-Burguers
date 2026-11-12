from pydantic import BaseModel

class CartRequest(BaseModel):
    ids: list[int]