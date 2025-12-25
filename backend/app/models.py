import datetime
from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey,
    func
)
from sqlalchemy.orm import relationship
from .database import Base

class MediaFile(Base):
    __tablename__ = "media_files"

    id = Column(Integer, primary_key=True, index=True)
    file_path = Column(String, nullable=False)
    file_hash = Column(String, unique=True, index=True, nullable=False)
    file_size = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=func.now())
    ref_count = Column(Integer, default=1, nullable=False)

    library_items = relationship("LibraryItem", back_populates="media")

class LibraryItem(Base):
    __tablename__ = "library_items"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    media_id = Column(Integer, ForeignKey("media_files.id"), nullable=False)

    user = relationship("User", back_populates="library")
    media = relationship("MediaFile", back_populates="library_items")


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)

    library = relationship("LibraryItem", back_populates="user")
