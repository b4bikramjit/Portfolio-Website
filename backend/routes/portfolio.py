from fastapi import HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase
from models.portfolio import Portfolio
import logging

logger = logging.getLogger(__name__)


async def get_portfolio(db: AsyncIOMotorDatabase):
    """
    Get complete portfolio data
    """
    try:
        # Fetch portfolio document (there should be only one)
        portfolio_data = await db.portfolio.find_one()
        
        if not portfolio_data:
            logger.error("Portfolio data not found in database")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Portfolio data not found. Please seed the database."
            )
        
        # Remove MongoDB _id field
        if '_id' in portfolio_data:
            del portfolio_data['_id']
        
        return portfolio_data
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching portfolio data: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch portfolio data: {str(e)}"
        )


async def update_portfolio(portfolio: Portfolio, db: AsyncIOMotorDatabase):
    """
    Update portfolio data (Admin endpoint - can be protected later)
    """
    try:
        portfolio_dict = portfolio.dict()
        
        # Update or insert portfolio document
        result = await db.portfolio.replace_one(
            {},  # Match any document (should only be one)
            portfolio_dict,
            upsert=True
        )
        
        logger.info("Portfolio data updated successfully")
        
        return {
            "success": True,
            "message": "Portfolio updated successfully",
            "modified_count": result.modified_count
        }
        
    except Exception as e:
        logger.error(f"Error updating portfolio: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update portfolio"
        )
