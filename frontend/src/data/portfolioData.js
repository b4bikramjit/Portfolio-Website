export const portfolioData = {
    "personal": {
        "name": "Bikramjit Singh",
        "title": "Data Analyst & Machine Learning Enthusiast",
        "tagline": "Transforming data into actionable insights",
        "phone": "(+1) 437-248-8183",
        "email": "b8singh@uwaterloo.ca",
        "github": "https://github.com/b4bikramjit",
        "linkedin": "https://www.linkedin.com/in/bikramjit-singh-991b9a27b/",
        "location": "Waterloo, ON"
    },
    "about": {
        "description": "Data Analyst with expertise in machine learning, statistical modeling, and business intelligence. Currently pursuing BMath Honors in Statistics at University of Waterloo. Passionate about leveraging data science to solve real-world problems and drive business decisions.",
        "highlights": [
            { "label": "Projects Completed", "value": "15+" },
            { "label": "ML Models Deployed", "value": "8" },
            { "label": "Data Points Analyzed", "value": "500K+" },
            { "label": "Accuracy Achieved", "value": "98%" }
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
            "Classification Modeling", "Optimization"
        ]
    },
    "experience": [
        {
            "id": 1,
            "title": "AI and Marketing Intern",
            "company": "Da Silva International",
            "location": "Edmonton",
            "period": "Sept 2025 \u2013 Dec 2025",
            "achievements": [
                "Authored **market and competitive analysis reports** across US, Canada, and India, evaluating **10+ AI sports broadcasting**, analytics, and sales platforms",
                "Designed **data-driven marketing collateral** for SportsStreamTV, supporting go-to-market strategy and improving pitch effectiveness by **30%**",
                "Optimized **Facebook Meta ad performance** for Toronto Raptors and Edmonton Oilers Cruise, increasing engagement by **25%** and reducing CPC by **18%**"
            ]
        },
        {
            "id": 2,
            "title": "Marketing Coordinator",
            "company": "Faculty of Mathematics, University of Waterloo",
            "location": "Waterloo",
            "period": "Jan 2025 \u2013 April 2025",
            "achievements": [
                "Analyzed **website and Instagram performance** across 5+ campaigns, tracking reach, impressions, CTR, and engagement rate to identify audience trends",
                "Applied **data-backed insights** to optimize **WCMS-managed pages** (30+ pages) and digital content, improving accessibility and increasing average engagement by **20%**",
                "Translated **engagement analytics** into actionable recommendations for event and campaign strategy"
            ]
        },
        {
            "id": 3,
            "title": "Machine Learning Researcher",
            "company": "Sweat Free Apparel",
            "location": "Waterloo",
            "period": "May 2024 \u2013 Sept 2024",
            "achievements": [
                "Developed and evaluated **ML classification models** for underwater garbage detection, achieving **80%+ accuracy**",
                "Applied **data analytics and automation** to social media performance tracking, analyzing **10k+ user interactions**",
                "Improved engagement by **20%** while reducing manual reporting effort by **40%**"
            ]
        }
    ],
    "projects": [
        {
            "id": 1,
            "title": "Canada House Price Predictor",
            "description": "Developed and deployed a CatBoost-based house price prediction model with 74% R\u00b2 and 25% MAPE using log-price modeling, location frequency encoding, and FastAPI inference.",
            "technologies": ["Python", "CatBoost", "FastAPI", "Machine Learning"],
            "metrics": {
                "accuracy": "74% R\u00b2",
                "error": "25% MAPE"
            },
            "image": "/assets/projects/canada_house_price.png",
            "link": "https://predspriceca.onrender.com/",
            "github": "https://github.com/b4bikramjit/canada-house-price-prediction"
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
            "image": "/assets/projects/ipl_analytics.png",
            "link": "https://insightsipl.streamlit.app/",
            "github": "https://github.com/b4bikramjit/IPL-Analytics-Dashboard"
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
            "image": "/assets/projects/phishing_detector.png",
            "link": "https://detectemail.streamlit.app/",
            "github": "https://github.com/b4bikramjit/Phishing-Email-Detection-System"
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
            "image": "/assets/projects/youtube_sentiment.png",
            "link": "https://ytsentimentanalyzer.streamlit.app/",
            "github": "https://github.com/b4bikramjit/youtube-sentiment-analyzer"
        },
        {
            "id": 5,
            "title": "SuperStore Sales Dashboard",
            "description": "Designed and deployed an interactive Power BI dashboard on a 9K+ US retail dataset to analyze sales trends, seasonality, and category performance, enabling data-driven insights and more informed business decision-making.",
            "technologies": ["SQL", "Power BI"],
            "metrics": {
                "size": "9K+ records",
                "KPI's": "10"
            },
            "image": "/assets/projects/superstore_sales.png",
            "link": "https://app.powerbi.com/groups/me/reports/6d4ec908-7e18-41cb-aebd-7d45e35c12c3/ReportSection?experience=power-bi",
            "github": "https://github.com/b4bikramjit/SuperStore-Sales-Analysis"
        },
        {
            "id": 6,
            "title": "Marketing Collateral",
            "description": "Designed marketing brochure and authored market and competitive analysis reports evaluating 10+ AI sports broadcasting, analytics, and sales platforms across US, Canada and India.",
            "technologies": ["AI-assisted Research", "Statistical Analysis", "Canva"],
            "metrics": {
                "papers": "2",
                "horizon": "4 Months"
            },
            "image": "/assets/projects/marketing_research.png",
            "link": "https://drive.google.com/drive/folders/14P3Jobjm_cW6n8MSrbsl_QGh6C8dqABp?usp=sharing",
            "github": "https://github.com/b4bikramjit/Marketing-Collateral"
        }
    ],
    "education": {
        "degree": "BMath Honors in Statistics",
        "school": "University of Waterloo",
        "location": "Waterloo, ON",
        "period": "Sep 2022 \u2013 Present"
    }
};
