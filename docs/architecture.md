# System Architecture

## Overview

The application follows a **modular monolithic architecture** with clear separation of concerns, built on NestJS framework. This design provides scalability while maintaining simplicity for development and deployment.

## Architecture Diagram

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│    Frontend     │    │  Load Balancer  │    │      nginx      │
│  (React/Vue)    │◄──►│     (nginx)     │◄──►│   (Optional)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         ▲
         │ HTTP/WebSocket
         ▼
┌─────────────────┐
│   NestJS App    │
│   (Port 3000)   │
└─────────────────┘
        ▲
        │
┌───────┬───────┐
▼       ▼
┌─────────────┐ ┌─────────────┐
│   MongoDB   │ │  RabbitMQ   │
│(Port 27017) │ │(Port 5672)  │
└─────────────┘ └─────────────┘
```

## Core Modules

### 🔐 Auth Module

**Purpose:** User authentication and authorization

- JWT-based authentication
- User registration and login

### 👤 Users Module

**Purpose:** User management and profile operations

- User profile management
- CRUD operations for user data
- Automatic zodiac and horoscope generation based on birth date

### 💬 Chat Module

**Purpose:** Real-time messaging functionality

- WebSocket-based real-time messaging
- Message history and persistence

### 📨 Messaging Module

**Purpose:** Background messaging and notifications

- RabbitMQ integration for message queuing
- Background job processing
- Event-driven communication

## Data Flow

### 📱 Real-time Messaging Flow

```
1. User sends message via HTTP
   ↓
2. Message validated and authenticated
   ↓
3. Message saved to MongoDB
   ↓
4. Message published to RabbitMQ
```

### 🔑 Authentication Flow

```
1. User submits credentials (email/password)
   ↓
2. Credentials validated against database
   ↓
3. JWT access token generated
```

## Security Implementation

### 🛡️ Authentication Security

- **JWT Tokens** with configurable expiration
- **Password Hashing** using bcrypt with salt rounds
- **Rate Limiting** on authentication endpoints

### 🔒 Authorization Security

- **Route Guards** for protected endpoints

### 🔐 Data Protection

- **Input Validation** using class-validator
- **SQL Injection Prevention** through ORM usage
- **XSS Protection** with sanitization
- **CORS Configuration** for cross-origin requests
- **Helmet.js** for HTTP security headers

## Database Schema

### Collections Overview

| Collection | Purpose           | Key Fields                                                          |
| ---------- | ----------------- | ------------------------------------------------------------------- |
| `users`    | Application users | `username`, `email`, `password`, `birthDate`, `zodiac`, `horoscope` |
| `messages` | Chat messages     | `from`, `to`, `content`, `createdAt`                                |

## Infrastructure Components

### 🗄️ Database Layer

- **MongoDB** - Primary database for application data
- **Connection Pooling** for optimal performance

### 📡 Message Queue

- **RabbitMQ** - Asynchronous message processing

### 🚀 Application Layer

- **NestJS** - Node.js framework with TypeScript
- **Socket.IO** - Real-time bidirectional communication

## Deployment Architecture

### 🐳 Docker Configuration

```yaml
services:
  app:
    - NestJS application
    - Health checks
    - Environment configuration

  mongodb:
    - Data persistence
    - Replica set support

  rabbitmq:
    - Message queue
    - Management interface
```

### 🔄 CI/CD Pipeline

1. **Code Push** → GitHub repository
2. **Automated Testing** → Unit & E2E tests
3. **Build Process** → Docker image creation
4. **Deployment** → Container orchestration
5. **Health Checks** → Application monitoring

## Performance Considerations

### 📊 Optimization Strategies

- **Database Indexing** for frequently queried fields
- **Connection Pooling** for database connections
- **Message Queue** for non-blocking operations

### 📈 Monitoring & Logging

- **Application Logs** with structured logging
- **Performance Metrics** collection
- **Error Tracking** and alerting
- **Health Check Endpoints** for service monitoring

## Scalability Path

### 🔀 Horizontal Scaling Options

1. **Load Balancer** - Distribute traffic across instances
2. **Database Sharding** - Split data across multiple databases
3. **Microservices Migration** - Break down modules into services
4. **CDN Integration** - Static asset delivery optimization

This architecture provides a solid foundation for a scalable chat application while maintaining development simplicity and operational efficiency.
