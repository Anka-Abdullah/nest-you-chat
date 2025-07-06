# Setup Guide

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js 18+** - JavaScript runtime
- **Docker & Docker Compose** - For containerization
- **MongoDB** (optional) - Database (can use Docker alternative)

## Installation

### 1. Clone Repository

```bash
git clone <repository-url>
cd chat-app
```

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your configuration
# Configure database URLs, JWT secrets, etc.
```

### 3. Install Dependencies

```bash
npm install
```

## Running the Application

### Option A: Using Docker (Recommended)

```bash
# Development environment
npm run docker:dev

# Production environment
npm run docker:prod
```

### Option B: Local Development

```bash
# Start required services (MongoDB & RabbitMQ)
docker-compose up mongodb rabbitmq -d

# Start the application
npm run start:dev
```

## Testing

```bash
# Run unit tests
npm run test

# Run end-to-end tests
npm run test:e2e

# Generate test coverage report
npm run test:cov
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run start:dev` | Start development server |
| `npm run build` | Build for production |
| `npm run docker:dev` | Run with Docker (development) |
| `npm run docker:prod` | Run with Docker (production) |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run test:cov` | Generate test coverage |

## Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Check which process is using the port
lsof -i :3000

# Kill the process
kill -9 <PID>
```

**Docker issues:**
```bash
# Reset Docker containers
docker-compose down --volumes
docker-compose up --build
```

**Database connection issues:**
- Verify MongoDB is running
- Check connection string in `.env`
- Ensure network connectivity

## Project Structure

```
chat-app/
├── src/
│   ├── auth/          # Authentication module
│   ├── chat/          # Chat functionality
│   ├── users/         # User management
│   └── common/        # Shared utilities
├── test/              # Test files
├── docker-compose.yml # Docker configuration
├── .env.example       # Environment template
└── package.json       # Dependencies
```

## Next Steps

1. Configure your `.env` file with proper values
2. Start the application using your preferred method
3. Access the application at `http://localhost:3000`
4. Check the API documentation at `http://localhost:3000/api`

For more detailed information, refer to the individual module documentation.