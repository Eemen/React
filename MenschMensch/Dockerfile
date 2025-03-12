# Use Python 3.9 slim image as base
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Install system dependencies required for OpenCV
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first to leverage Docker cache
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY face_detection/ face_detection/

# Set environment variables
ENV FLASK_APP=face_detection/app.py
ENV FLASK_ENV=production

# Expose port 5000
EXPOSE 5000

# Command to run the application
CMD ["flask", "run", "--host=0.0.0.0"] 