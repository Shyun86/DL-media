from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from .config import settings

# Create an asynchronous engine for the worker
engine = create_async_engine(
    settings.DATABASE_URL,
    echo=False,
)

# Create a configured "Session" class
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False,
)

# Create a Base class for declarative models
# This will be populated by the models.py file
Base = declarative_base()
