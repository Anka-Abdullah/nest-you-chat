#!/bin/bash

# Build script for production
echo "🏗️  Building Chat Application..."

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist

# Install production dependencies
echo "📦 Installing production dependencies..."
npm ci --only=production

# Build application
echo "🔨 Building application..."
npm run build

# Build Docker image
echo "🐳 Building Docker image..."
docker build -f docker/Dockerfile.prod -t chat-app:latest .

echo "✅ Build completed!"
echo "🚀 You can now run: docker run -p 3000:3000 chat-app:latest"