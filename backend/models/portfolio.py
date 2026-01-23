from pydantic import BaseModel, EmailStr, Field
from typing import List, Dict, Optional
from datetime import datetime


class PersonalInfo(BaseModel):
    name: str
    title: str
    tagline: str
    phone: str
    email: str
    github: str
    linkedin: str
    location: str


class Highlight(BaseModel):
    label: str
    value: str


class About(BaseModel):
    description: str
    highlights: List[Highlight]


class Skills(BaseModel):
    programming: List[str]
    software: List[str]
    techniques: List[str]


class Experience(BaseModel):
    id: int
    title: str
    company: str
    location: str
    period: str
    achievements: List[str]


class Project(BaseModel):
    id: int
    title: str
    description: str
    technologies: List[str]
    metrics: Dict[str, str]
    image: str
    link: str
    github: str


class Education(BaseModel):
    degree: str
    school: str
    location: str
    period: str


class Portfolio(BaseModel):
    personal: PersonalInfo
    about: About
    skills: Skills
    experience: List[Experience]
    projects: List[Project]
    education: Education
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_schema_extra = {
            "example": {
                "personal": {
                    "name": "Bikramjit Singh",
                    "title": "Data Analyst",
                    "tagline": "Transforming data into insights"
                }
            }
        }
