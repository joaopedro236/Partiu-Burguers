from fastapi.responses import JSONResponse
from fastapi import FastAPI, Request
import time
from collections import defaultdict
import os
from dotenv import load_dotenv
from API.Routers.getOrder import router as getOrder
from API.Databases.Databases.Orders import createDatabaseOrders 
app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

load_dotenv()


requests_by_ip = defaultdict(list)


@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    ip = request.client.host
    now = time.time()

    requests_by_ip[ip] = [t for t in requests_by_ip[ip] if now - t < 1]

    if len(requests_by_ip[ip]) >= 30:
        return JSONResponse(
            status_code=429,
            content={"message": "Limit of 30 requests/second exceeded"},
        )

    requests_by_ip[ip].append(now)

    return await call_next(request)


origins = os.getenv("FRONTEND_URLS").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Set-Cookie"],
)
app.include_router(getOrder)
@app.on_event("startup")
def startup():
    createDatabaseOrders()