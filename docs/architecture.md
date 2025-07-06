# System Architecture

## Overview

The application follows a modular monolithic architecture with clear separation of concerns.

## Architecture Diagram


┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ Frontend │ │ Load Balancer │ │ nginx │
│ (React/Vue) │◄──►│ (nginx) │◄──►│ (Optional) │
└─────────────────┘ └─────────────────┘ └─────────────────┘
▲
│
┌─────────────────┐
│ NestJS App │
│ (Port 3000) │
└─────────────────┘
▲
┌───────────┼───────────┐
▼ ▼ ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ MongoDB │ │ RabbitMQ │ │ Redis │
│ (Port 27017)│ │(Port 5672) │ │(Port 6379) │
└─────────────┘ └─────────────┘ └─────────────┘


## Modules

### Auth Module

- JWT authentication
- User registration/login
- Token refresh

### Users Module

- User profile management
- User CRUD operations

### Chat Module

- Real-time messaging
- Room management
- Message history

### Messaging Module

- RabbitMQ integration
- Notification system
- Background jobs

## Data Flow

### Real-time Messaging

1. User sends message via WebSocket
2. Message validated and saved to MongoDB
3. Message broadcasted to room members
4. Notification sent via RabbitMQ

### Authentication Flow

1. User submits credentials
2. Credentials validated
3. JWT token generated
4. Token returned to client
5. Token used for subsequent requests

## Security

### Authentication

- JWT tokens with expiration
- Refresh token rotation
- Password hashing with bcrypt

### Authorization

- Role-based access control
- Route guards
- WebSocket authentication

### Data Protection

- Input validation
- SQL injection prevention
- XSS protection
