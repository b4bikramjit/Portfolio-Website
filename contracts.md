# Backend Implementation Contracts

## Overview
This document outlines the API contracts, data models, and integration strategy for the portfolio website backend.

## Current State - Mocked Data (frontend/src/mock.js)
All portfolio data is currently mocked in the frontend:
- Personal information (name, contact details, social links)
- About section (description, highlights/metrics)
- Skills (programming, software, techniques)
- Work experience (3 positions)
- Projects (6 projects with images, descriptions, metrics)
- Education details

## Backend Implementation Plan

### 1. MongoDB Models

#### ContactMessage Model
```python
{
  "_id": ObjectId,
  "name": String (required),
  "email": String (required),
  "message": String (required),
  "status": String (enum: ["new", "read", "replied"], default: "new"),
  "created_at": DateTime (auto),
  "updated_at": DateTime (auto)
}
```

#### PortfolioData Model (Single Document)
```python
{
  "_id": ObjectId,
  "personal": {
    "name": String,
    "title": String,
    "tagline": String,
    "phone": String,
    "email": String,
    "github": String,
    "linkedin": String,
    "location": String
  },
  "about": {
    "description": String,
    "highlights": [
      {
        "label": String,
        "value": String
      }
    ]
  },
  "skills": {
    "programming": [String],
    "software": [String],
    "techniques": [String]
  },
  "experience": [
    {
      "id": Number,
      "title": String,
      "company": String,
      "location": String,
      "period": String,
      "achievements": [String]
    }
  ],
  "projects": [
    {
      "id": Number,
      "title": String,
      "description": String,
      "technologies": [String],
      "metrics": Object,
      "image": String,
      "link": String,
      "github": String
    }
  ],
  "education": {
    "degree": String,
    "school": String,
    "location": String,
    "period": String
  },
  "updated_at": DateTime
}
```

### 2. API Endpoints

#### Public Endpoints (No Auth Required)

**GET /api/portfolio**
- Returns complete portfolio data
- Response: PortfolioData object
- Use: Loads all portfolio content on page load

**POST /api/contact**
- Submits contact form message
- Request Body:
  ```json
  {
    "name": "string",
    "email": "string",
    "message": "string"
  }
  ```
- Response:
  ```json
  {
    "success": true,
    "message": "Message sent successfully",
    "id": "message_id"
  }
  ```
- Validation: email format, required fields

#### Admin Endpoints (Future Enhancement - Not in MVP)
- GET /api/admin/messages - List all contact messages
- PATCH /api/admin/messages/:id - Update message status
- PUT /api/admin/portfolio - Update portfolio content

### 3. Database Initialization
- Create initial portfolio document with data from mock.js
- Seed database with current portfolio content

### 4. Frontend Integration Changes

#### File: frontend/src/App.js
- Add API call to fetch portfolio data on mount
- Store in React state or context
- Pass to child components

#### File: frontend/src/components/Contact.jsx
- Update form submission to call POST /api/contact
- Handle success/error responses
- Show toast notifications

#### Files to Update (Remove mock imports, use props/context):
- Hero.jsx
- About.jsx
- Skills.jsx
- Experience.jsx
- Projects.jsx
- Contact.jsx
- Footer.jsx

### 5. Error Handling
- 400 Bad Request: Invalid input data
- 404 Not Found: Portfolio data not found
- 500 Internal Server Error: Database errors
- Return structured error responses with messages

### 6. CORS Configuration
- Already configured in server.py
- Allows all origins for development

### 7. Data Flow

**Page Load:**
```
Browser → GET /api/portfolio → Backend → MongoDB → Return Data → Frontend renders
```

**Contact Form:**
```
User fills form → Submit → POST /api/contact → Validate → Save to DB → Return success → Show toast
```

### 8. Backend Files to Create/Modify

**New Files:**
- `/app/backend/models/contact_message.py` - ContactMessage model
- `/app/backend/models/portfolio.py` - Portfolio model
- `/app/backend/routes/portfolio.py` - Portfolio endpoints
- `/app/backend/routes/contact.py` - Contact form endpoint
- `/app/backend/seed_data.py` - Initialize database with mock data

**Modified Files:**
- `/app/backend/server.py` - Import and include new routes

### 9. Testing Checklist
- [ ] GET /api/portfolio returns complete data
- [ ] POST /api/contact saves message to database
- [ ] POST /api/contact validates email format
- [ ] POST /api/contact returns error for missing fields
- [ ] Frontend displays portfolio data from API
- [ ] Contact form submission shows success toast
- [ ] Contact form submission shows error toast on failure
- [ ] Page loads without errors in console

### 10. Migration Strategy
1. Build backend endpoints
2. Test endpoints with curl/Postman
3. Seed database with initial data
4. Update frontend to fetch from API
5. Test frontend integration
6. Remove mock.js file (optional - keep for reference)

## Notes
- MVP focuses on read-only portfolio and contact form
- Admin functionality for updating portfolio can be added later
- All data serves from single portfolio document for simplicity
- Contact messages stored separately for easy management
