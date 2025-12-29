import uuid
from datetime import datetime
from enum import Enum
from typing import List, Optional

from pydantic import BaseModel, Field


# =================================
#         Enums
# =================================

class MediaType(str, Enum):
    VIDEO = 'VIDEO'
    IMAGE = 'IMAGE'
    AUDIO = 'AUDIO'


# =================================
#         API Input Schemas
# =================================

class DownloadRequest(BaseModel):
    url: str


class Cookie(BaseModel):
    name: str
    value: str
    domain: str
    path: str
    expires: float
    httpOnly: bool
    secure: bool
    sameSite: str


class CookieUpdateRequest(BaseModel):
    cookies: List[Cookie]


# =================================
#         API Output Schemas
# =================================

class DownloadResponse(BaseModel):
    job_id: str
    status: str = "queued"


class CookieUpdateResponse(BaseModel):
    status: str = "success"
    count: int


# =================================
#         Database Object Schemas
# =================================

class MediaBase(BaseModel):
    file_hash: str
    file_path: str
    media_type: MediaType
    file_size: int
    source_url: Optional[str] = None


class Media(MediaBase):
    id: uuid.UUID
    created_at: datetime

    class Config:
        orm_mode = True


class FolderBase(BaseModel):
    name: str
    parent_id: Optional[uuid.UUID] = None


class Folder(FolderBase):
    id: uuid.UUID
    created_at: datetime

    class Config:
        orm_mode = True
