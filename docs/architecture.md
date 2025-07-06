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
┌────────┼────────┐
▼        ▼        ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│   MongoDB   │ │  RabbitMQ   │ │    Redis    │
│(Port 27017) │ │(Port 5672)  │ │(Port 6379)  │
└─────────────┘ └─────────────┘ └─────────────┘
```

## Core Modules

### 🔐 Auth Module
**Purpose:** User authentication and authorization
- JWT-based authentication
- User registration and login
- Token refresh mechanism
- Password reset functionality

### 👤 Users Module
**Purpose:** User management and profile operations
- User profile management
- CRUD operations for user data
- User relationship management
- Profile picture handling

### 💬 Chat Module
**Purpose:** Real-time messaging functionality
- WebSocket-based real-time messaging
- Chat room management
- Message history and persistence
- File sharing capabilities

### 📨 Messaging Module
**Purpose:** Background messaging and notifications
- RabbitMQ integration for message queuing
- Email and push notification system
- Background job processing
- Event-driven communication

## Data Flow

### 📱 Real-time Messaging Flow

```
1. User sends message via WebSocket
   ↓
2. Message validated and authenticated
   ↓
3. Message saved to MongoDB
   ↓
4. Message broadcasted to room members
   ↓
5. Notification queued in RabbitMQ
   ↓
6. Push notification sent to offline users
```

### 🔑 Authentication Flow

```
1. User submits credentials (email/password)
   ↓
2. Credentials validated against database
   ↓
3. JWT access token + refresh token generated
   ↓
4. Tokens returned to client
   ↓
5. Access token used for subsequent requests
   ↓
6. Refresh token used when access token expires
```

## Security Implementation

### 🛡️ Authentication Security
- **JWT Tokens** with configurable expiration
- **Refresh Token Rotation** for enhanced security
- **Password Hashing** using bcrypt with salt rounds
- **Rate Limiting** on authentication endpoints

### 🔒 Authorization Security
- **Role-based Access Control (RBAC)**
- **Route Guards** for protected endpoints
- **WebSocket Authentication** for real-time connections
- **Permission-based Resource Access**

### 🔐 Data Protection
- **Input Validation** using class-validator
- **SQL Injection Prevention** through ORM usage
- **XSS Protection** with sanitization
- **CORS Configuration** for cross-origin requests
- **Helmet.js** for HTTP security headers

## Database Schema

### Collections Overview

| Collection | Purpose | Key Fields |
|------------|---------|------------|
| `users` | User profiles | `email`, `password`, `profile` |
| `chats` | Chat rooms | `name`, `participants`, `type` |
| `messages` | Chat messages | `content`, `sender`, `chatId`, `timestamp` |
| `notifications` | User notifications | `userId`, `type`, `read`, `data` |

## Infrastructure Components

### 🗄️ Database Layer
- **MongoDB** - Primary database for application data
- **Redis** - Session storage and caching
- **Connection Pooling** for optimal performance

### 📡 Message Queue
- **RabbitMQ** - Asynchronous message processing
- **Dead Letter Queues** for failed message handling
- **Message Persistence** for reliability

### 🚀 Application Layer
- **NestJS** - Node.js framework with TypeScript
- **Socket.IO** - Real-time bidirectional communication
- **Swagger** - API documentation generation

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
    
  redis:
    - Session storage
    - Caching layer
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
- **Caching Strategy** using Redis for hot data
- **Message Queue** for non-blocking operations
- **Pagination** for large data sets

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