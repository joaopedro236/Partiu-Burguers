from pydantic import Basemodel

class CartRequest(BaseModel):
    ids: list[int]