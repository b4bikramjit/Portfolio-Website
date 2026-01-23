"""
Seed database with initial portfolio data
Run this script to initialize the database with portfolio content
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Portfolio data to seed
PORTFOLIO_DATA = {
    "personal": {
        "name": "Bikramjit Singh",
        "title": "Data Analyst & Machine Learning Enthusiast",
        "tagline": "Transforming data into actionable insights",
        "phone": "(+1) 437-248-8183",
        "email": "bikramjit@example.com",
        "github": "https://github.com/bikramjit",
        "linkedin": "https://linkedin.com/in/bikramjit",
        "location": "Waterloo, ON"
    },
    "about": {
        "description": "Data Analyst with expertise in machine learning, statistical modeling, and business intelligence. Currently pursuing BMath Honors in Statistics at University of Waterloo. Passionate about leveraging data science to solve real-world problems and drive business decisions.",
        "highlights": [
            {"label": "Projects Completed", "value": "15+"},
            {"label": "ML Models Deployed", "value": "8"},
            {"label": "Data Points Analyzed", "value": "500K+"},
            {"label": "Accuracy Achieved", "value": "98%"}
        ]
    },
    "skills": {
        "programming": [
            "Python", "SQL", "R", "Pandas", "NumPy", "Matplotlib",
            "Plotly", "Scikit-learn", "HTML", "CSS", "JavaScript"
        ],
        "software": [
            "Excel", "Tableau", "Power BI", "Google Analytics",
            "Emplifi", "Snowflake", "Amazon SageMaker", "Azure Databricks"
        ],
        "techniques": [
            "Data Preprocessing", "Exploratory Data Analysis",
            "Feature Engineering", "Regression Modeling",
            "Classification Modeling", "Optimization",
            "Machine Learning", "Statistical Analysis"
        ]
    },
    "experience": [
        {
            "id": 1,
            "title": "AI and Marketing Intern",
            "company": "Da Silva International",
            "location": "Edmonton",
            "period": "Sept 2025 – Dec 2025",
            "achievements": [
                "Authored market and competitive analysis reports across US, Canada, and India, evaluating 10+ AI sports broadcasting, analytics, and sales platforms",
                "Designed data-driven marketing collateral for SportsStreamTV, supporting go-to-market strategy and improving pitch effectiveness by 30%",
                "Optimized Facebook Meta ad performance for Toronto Raptors and Edmonton Oilers Cruise, increasing engagement by 25% and reducing CPC by 18%"
            ]
        },
        {
            "id": 2,
            "title": "Marketing Coordinator",
            "company": "Faculty of Mathematics, University of Waterloo",
            "location": "Waterloo",
            "period": "Jan 2025 – April 2025",
            "achievements": [
                "Analyzed website and Instagram performance across 5+ campaigns, tracking reach, impressions, CTR, and engagement rate to identify audience trends",
                "Applied data-backed insights to optimize WCMS-managed pages (30+ pages) and digital content, improving accessibility and increasing average engagement by 20%",
                "Translated engagement analytics into actionable recommendations for event and campaign strategy"
            ]
        },
        {
            "id": 3,
            "title": "Machine Learning Researcher",
            "company": "Sweat Free Apparel",
            "location": "Waterloo",
            "period": "May 2024 – Sept 2024",
            "achievements": [
                "Developed and evaluated ML classification models for underwater garbage detection, achieving 80%+ accuracy",
                "Applied data analytics and automation to social media performance tracking, analyzing 10k+ user interactions",
                "Improved engagement by 20% while reducing manual reporting effort by 40%"
            ]
        }
    ],
    "projects": [
        {
            "id": 1,
            "title": "Canada House Price Predictor",
            "description": "Developed and deployed a CatBoost-based house price prediction model with 74% R² and 25% MAPE using log-price modeling, location frequency encoding, and FastAPI inference.",
            "technologies": ["Python", "CatBoost", "FastAPI", "Machine Learning"],
            "metrics": {
                "accuracy": "74% R²",
                "error": "25% MAPE"
            },
            "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
            "link": "#",
            "github": "#"
        },
        {
            "id": 2,
            "title": "IPL Analytics Dashboard",
            "description": "Built a Python-based analytics dashboard analyzing 260K+ IPL deliveries to compute team, player, and season-level metrics using Pandas, Plotly, and Streamlit.",
            "technologies": ["Python", "Pandas", "Plotly", "Streamlit"],
            "metrics": {
                "dataPoints": "260K+",
                "insights": "Team & Player Metrics"
            },
            "image": "https://images.unsplash.com/photo-1748609160056-7b95f30041f0",
            "link": "#",
            "github": "#"
        },
        {
            "id": 3,
            "title": "Phishing Email Detector",
            "description": "Built an end-to-end phishing detection ML pipeline using TF-IDF and Linear SVM, performing cross-validation and hyperparameter tuning to optimize recall.",
            "technologies": ["Python", "TF-IDF", "SVM", "Scikit-learn"],
            "metrics": {
                "accuracy": "98%",
                "recall": "98%"
            },
            "image": "https://images.unsplash.com/photo-1759661966728-4a02e3c6ed91",
            "link": "#",
            "github": "#"
        },
        {
            "id": 4,
            "title": "YouTube Comment Sentiment Analyzer",
            "description": "Built and deployed an NLP sentiment analysis pipeline using TF-IDF n-grams and LightGBM with a Streamlit dashboard for live YouTube comment trend and keyword analysis.",
            "technologies": ["Python", "NLP", "LightGBM", "Streamlit"],
            "metrics": {
                "accuracy": "87%",
                "f1Score": "0.85"
            },
            "image": "https://images.unsplash.com/photo-1762279389083-abf71f22d338",
            "link": "#",
            "github": "#"
        },
        {
            "id": 5,
            "title": "Customer Segmentation Analysis",
            "description": "Performed clustering analysis on customer data using K-means and hierarchical clustering to identify distinct customer segments for targeted marketing strategies.",
            "technologies": ["Python", "Scikit-learn", "Pandas", "Seaborn"],
            "metrics": {
                "segments": "5 Clusters",
                "improvement": "35% CTR"
            },
            "image": "https://images.unsplash.com/photo-1759661990336-51bd4b951fea",
            "link": "#",
            "github": "#"
        },
        {
            "id": 6,
            "title": "Sales Forecasting Model",
            "description": "Developed time-series forecasting model using ARIMA and Prophet to predict quarterly sales, achieving high accuracy for business planning and inventory management.",
            "technologies": ["Python", "Prophet", "ARIMA", "Time Series"],
            "metrics": {
                "accuracy": "92%",
                "horizon": "6 Months"
            },
            "image": "https://images.pexels.com/photos/17483907/pexels-photo-17483907.png",
            "link": "#",
            "github": "#"
        }
    ],
    "education": {
        "degree": "BMath Honors in Statistics",
        "school": "University of Waterloo",
        "location": "Waterloo, ON",
        "period": "Sep 2022 – Present"
    },
    "updated_at": datetime.utcnow()
}


async def seed_database():
    """Seed the database with initial portfolio data"""
    
    # Connect to MongoDB
    mongo_url = os.environ.get('MONGO_URL')
    if not mongo_url:
        print("Error: MONGO_URL not found in environment variables")
        return
    
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ.get('DB_NAME', 'portfolio_db')]
    
    try:
        # Check if portfolio already exists
        existing = await db.portfolio.find_one()
        
        if existing:
            print("Portfolio data already exists in database.")
            overwrite = input("Do you want to overwrite it? (yes/no): ")
            if overwrite.lower() != 'yes':
                print("Seeding cancelled.")
                return
            
            # Delete existing portfolio
            await db.portfolio.delete_many({})
            print("Existing portfolio data deleted.")
        
        # Insert new portfolio data
        result = await db.portfolio.insert_one(PORTFOLIO_DATA)
        print(f"✅ Portfolio data seeded successfully! Document ID: {result.inserted_id}")
        
        # Show summary
        portfolio = await db.portfolio.find_one()
        print(f"\n📊 Portfolio Summary:")
        print(f"  - Name: {portfolio['personal']['name']}")
        print(f"  - Skills: {len(portfolio['skills']['programming'])} programming languages")
        print(f"  - Experience: {len(portfolio['experience'])} positions")
        print(f"  - Projects: {len(portfolio['projects'])} projects")
        
    except Exception as e:
        print(f"❌ Error seeding database: {str(e)}")
    finally:
        client.close()


if __name__ == "__main__":
    print("🌱 Seeding Portfolio Database...\n")
    asyncio.run(seed_database())
