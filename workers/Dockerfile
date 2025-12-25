# Base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy and install Python requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Command to run the worker
CMD ["arq", "app.main.WorkerSettings"]
