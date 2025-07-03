#!/bin/bash

# Test script
echo "🧪 Running Tests..."

# Set test environment
export NODE_ENV=test

# Start test database
echo "🐳 Starting test database..."
docker-compose -f docker-compose.test.yml up -d mongodb-test

# Wait for database
sleep 5

# Run tests
echo "🏃 Running unit tests..."
npm run test

echo "🏃 Running e2e tests..."
npm run test:e2e

echo "📊 Generating coverage report..."
npm run test:cov

# Cleanup
echo "🧹 Cleaning up..."
docker-compose -f docker-compose.test.yml down

echo "✅ Tests completed!"