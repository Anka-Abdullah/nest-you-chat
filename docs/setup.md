# Setup Guide

## Prerequisites

- Node.js 18+
- Docker & Docker Compose
- MongoDB (optional, can use Docker)

## Installation

### 1. Clone Repository

\`\`\`bash
git clone <repository-url>
cd chat-app
\`\`\`

### 2. Environment Setup

\`\`\`bash
cp .env.example .env

# Edit .env with your configuration

\`\`\`

### 3. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 4. Run with Docker

\`\`\`bash

# Development

npm run docker:dev

# Production

npm run docker:prod
\`\`\`

### 5. Run Locally

\`\`\`bash

# Start MongoDB and RabbitMQ

docker-compose up mongodb rabbitmq -d

# Start application

npm run start:dev
\`\`\`

## Testing

\`\`\`bash

# Unit tests

npm run test

# E2E tests

npm run test:e2e

# Test coverage

npm run test:cov
\`\`\`
