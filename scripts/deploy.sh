#!/bin/bash

# Deployment script
echo "🚀 Deploying Chat Application..."

# Build application
./scripts/build.sh

# Push to registry (if using Docker registry)
if [ "$1" = "push" ]; then
    echo "📤 Pushing to Docker registry..."
    docker tag chat-app:latest your-registry/chat-app:latest
    docker push your-registry/chat-app:latest
fi

# Deploy with docker-compose
echo "🐳 Deploying with Docker Compose..."
docker-compose -f docker/docker-compose.prod.yml up -d

echo "✅ Deployment completed!"
echo "🌐 Application is running at http://localhost:3000"