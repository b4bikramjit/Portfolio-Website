from fastapi import FastAPI, APIRouter, Request, BackgroundTasks
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone
from models.contact_message import ContactMessageCreate


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mock')
if mongo_url == 'mock':
    from mock_db import MockClient
    client = MockClient()
    db = client[os.environ.get('DB_NAME', 'portfolio_db')]
else:
    import certifi
    # Force SSL settings into the URL parameters
    if '?' not in mongo_url:
        mongo_url += '?tls=true&tlsAllowInvalidCertificates=true'
    else:
        mongo_url += '&tls=true&tlsAllowInvalidCertificates=true'
    
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ.get('DB_NAME', 'portfolio_db')]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models (keeping legacy for backward compatibility)
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


# Dependency to inject db into route handlers
async def get_database():
    return db


# Add db to request state for route handlers
@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    request.state.db = db
    response = await call_next(request)
    return response

# Health Check
@app.get("/health")
def health():
    return {"status": "ok"}

# Legacy routes (keeping for backward compatibility)
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# Include the main API router
app.include_router(api_router)

# Include new route modules
@app.get("/api/portfolio")
async def get_portfolio_endpoint():
    from routes.portfolio import get_portfolio
    return await get_portfolio(db)

@app.post("/api/contact")
async def create_contact_endpoint(message_data: ContactMessageCreate, background_tasks: BackgroundTasks):
    from routes.contact import create_contact_message
    return await create_contact_message(message_data, db, background_tasks)

@app.get("/api/contact/messages")
async def get_messages_endpoint(skip: int = 0, limit: int = 50):
    from routes.contact import get_all_messages
    return await get_all_messages(db, skip, limit)

@app.get("/api/admin/seed")
async def seed_data_endpoint():
    """Trigger database seeding from the server side"""
    from seed_data import seed_database
    try:
        await seed_database()
        return {"status": "success", "message": "Database seeded successfully"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
    # Reload trigger (debug email)
