import uuid
from sqlalchemy import (
    Column,
    String,
    DateTime,
    ForeignKey,
    Enum,
    BigInteger,
    Table
)
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func

# Note: The Base is imported from the worker's own database session setup
from .database import Base

# Junction table for the many-to-many relationship between Media and Folder
media_folders = Table('media_folders', Base.metadata,
    Column('media_id', UUID(as_uuid=True), ForeignKey('media.id', ondelete='CASCADE'), primary_key=True),
    Column('folder_id', UUID(as_uuid=True), ForeignKey('folders.id', ondelete='CASCADE'), primary_key=True)
)

class Media(Base):
    __tablename__ = "media"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    file_hash = Column(String, unique=True, nullable=False, index=True)
    file_path = Column(String, nullable=False)
    # The Enum needs to be created on the DB, ensure the backend does this.
    media_type = Column(Enum('VIDEO', 'IMAGE', 'AUDIO', name='media_type_enum'), nullable=False)
    file_size = Column(BigInteger, nullable=False)
    source_url = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # This relationship is primarily for the backend API, but defined here for consistency
    folders = relationship("Folder",
                           secondary=media_folders,
                           back_populates="media_items")

class Folder(Base):
    __tablename__ = "folders"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    parent_id = Column(UUID(as_uuid=True), ForeignKey('folders.id'), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    media_items = relationship("Media",
                               secondary=media_folders,
                               back_populates="folders")
    
    parent = relationship("Folder", remote_side=[id])
    children = relationship("Folder", back_populates="parent")
