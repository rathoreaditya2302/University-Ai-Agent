from sqlalchemy import Column, Integer, String, Text, Float, DateTime, Boolean, Enum, ForeignKey, UniqueConstraint, Index
from sqlalchemy.sql import func
from database import Base

class Course(Base):
    __tablename__ = "courses"

    id             = Column(Integer, primary_key=True, index=True)
    name           = Column(String(200), nullable=False)
    branch_code    = Column(String(20), nullable=False)
    degree         = Column(String(50), nullable=False)
    duration_years = Column(Integer, nullable=False)
    fee_per_year   = Column(Integer, nullable=False)
    total_fee      = Column(Integer, nullable=False)
    eligibility    = Column(Text, nullable=True)
    keywords       = Column(Text, nullable=False)


class ExamSchedule(Base):
    __tablename__ = "exam_schedule"

    id            = Column(Integer, primary_key=True, index=True)
    academic_year = Column(String(20), nullable=False)
    semester      = Column(String(10), nullable=False)
    exam_type     = Column(String(20), nullable=False)
    start_date    = Column(String(50), nullable=False)
    end_date      = Column(String(50), nullable=False)
    notes         = Column(Text, nullable=True)


class HostelInfo(Base):
    __tablename__ = "hostel_info"

    id           = Column(Integer, primary_key=True, index=True)
    hostel_type  = Column(String(50), nullable=False)
    fee_per_year = Column(Integer, nullable=False)
    facilities   = Column(Text, nullable=False)
    mess_timings = Column(Text, nullable=True)
    notes        = Column(Text, nullable=True)


class PlacementData(Base):
    __tablename__ = "placement_data"

    id                  = Column(Integer, primary_key=True, index=True)
    year                = Column(String(20), nullable=False)
    avg_package_lpa     = Column(Float, nullable=False)
    highest_package_lpa = Column(Float, nullable=False)
    total_offers        = Column(Integer, nullable=True)
    top_companies       = Column(Text, nullable=False)
    notes               = Column(Text, nullable=True)


class GeneralInfo(Base):
    __tablename__ = "general_info"

    id       = Column(Integer, primary_key=True, index=True)
    category = Column(String(100), nullable=False)
    key      = Column(String(200), nullable=False)
    value    = Column(Text, nullable=False)
    keywords = Column(Text, nullable=False)


class User(Base):
    __tablename__ = "users"
 
    id              = Column(Integer, primary_key=True, index=True)
    name            = Column(String, nullable=False)
    email           = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    program         = Column(String, nullable=True)
    created_at      = Column(DateTime(timezone=True), server_default=func.now())
    updated_at      = Column(DateTime(timezone=True), onupdate=func.now())  
