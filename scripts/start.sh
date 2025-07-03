#!/bin/bash

# Start script for development
echo "🚀 Starting Chat Application..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    echo "📝 Please copy .env.example to .env and configure it"
    exit 1
fi

# Load environment variables
export $(cat .env | grep -v '^#' | xargs)

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running!"
    echo "🐳 Please start Docker first"
    exit 1
fi

# Start services
echo "🐳 Starting Docker services..."
docker-compose up -d mongodb rabbitmq

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start application
echo "🎯 Starting NestJS application..."
npm run start:dev