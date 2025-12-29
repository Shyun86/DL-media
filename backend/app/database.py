from sqlalchemy import text
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from .config import settings

# Create an asynchronous engine
engine = create_async_engine(
    settings.DATABASE_URL,
    echo=False,  # Set to True to see SQL queries
)

# Create a configured "Session" class
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False,
)

# Create a Base class for declarative models
Base = declarative_base()

async def init_db():
    """
    Initialize the database, create the UUID extension, and create all tables.
    """
    async with engine.begin() as conn:
        # Ensure the uuid-ossp extension is enabled
        await conn.execute(text('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"'))
        # Create all tables
        await conn.run_sync(Base.metadata.create_all)

# Dependency for FastAPI to get a DB session
async def get_db() -> AsyncSession:
    """
    Dependency that provides a database session for a request.
    """
    async with AsyncSessionLocal() as session:
        yield session
