from fastapi import APIRouter, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase
from models.contact_message import ContactMessage, ContactMessageCreate
import logging

router = APIRouter(prefix="/api", tags=["contact"])
logger = logging.getLogger(__name__)


@router.post("/contact", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_contact_message(message_data: ContactMessageCreate, db: AsyncIOMotorDatabase):
    """
    Submit a contact form message
    """
    try:
        # Create message object
        message = ContactMessage(
            name=message_data.name,
            email=message_data.email,
            message=message_data.message
        )
        
        # Save to database
        result = await db.contact_messages.insert_one(message.dict())
        
        logger.info(f"New contact message from {message.email}")
        
        return {
            "success": True,
            "message": "Thank you for reaching out! I'll get back to you soon.",
            "id": str(result.inserted_id)
        }
        
    except Exception as e:
        logger.error(f"Error saving contact message: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to send message. Please try again later."
        )


@router.get("/contact/messages", response_model=list)
async def get_all_messages(db: AsyncIOMotorDatabase, skip: int = 0, limit: int = 50):
    """
    Get all contact messages (Admin endpoint - can be protected later)
    """
    try:
        messages = await db.contact_messages.find().sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
        return messages
    except Exception as e:
        logger.error(f"Error fetching messages: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch messages"
        )
