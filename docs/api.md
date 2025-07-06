# API Documentation

## 🔗 Base URL
```
Development: http://localhost:3000/api
Production: https://your-domain.com/api
```

## 🔐 Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## 👤 Authentication Endpoints

### POST /api/register
**Purpose:** Register a new user account

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "user-id",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

**Status Codes:**
- `201` - Created successfully
- `400` - Validation error
- `409` - User already exists

---

### POST /api/login
**Purpose:** Authenticate user and receive JWT tokens

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user-id",
      "username": "john_doe",
      "email": "john@example.com"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "refresh-token-here"
    }
  }
}
```

**Status Codes:**
- `200` - Login successful
- `401` - Invalid credentials
- `400` - Validation error

---

## 👥 User Profile Endpoints

### GET /api/getProfile
**Purpose:** Get current user profile information

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user-id",
    "username": "john_doe",
    "email": "john@example.com",
    "profile": {
      "firstName": "John",
      "lastName": "Doe",
      "avatar": "avatar-url",
      "bio": "User bio"
    },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized
- `404` - Profile not found

---

### PUT /api/createProfile
**Purpose:** Create user profile (first-time setup)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "bio": "Software developer passionate about technology",
  "avatar": "base64-image-data-or-url"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile created successfully",
  "data": {
    "profile": {
      "firstName": "John",
      "lastName": "Doe",
      "bio": "Software developer passionate about technology",
      "avatar": "avatar-url"
    }
  }
}
```

**Status Codes:**
- `201` - Profile created
- `400` - Validation error
- `401` - Unauthorized
- `409` - Profile already exists

---

### PUT /api/updateProfile
**Purpose:** Update existing user profile

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "bio": "Updated bio",
  "avatar": "new-avatar-url"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "profile": {
      "firstName": "John",
      "lastName": "Doe",
      "bio": "Updated bio",
      "avatar": "new-avatar-url"
    }
  }
}
```

**Status Codes:**
- `200` - Profile updated
- `400` - Validation error
- `401` - Unauthorized
- `404` - Profile not found

---

## 💬 Chat Endpoints

### GET /api/viewMessages
**Purpose:** Get chat messages with a specific user

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `user` (required) - Target user ID
- `limit` (optional) - Number of messages to retrieve (default: 50)
- `offset` (optional) - Number of messages to skip (default: 0)

**Example:**
```
GET /api/viewMessages?user=user-id&limit=20&offset=0
```

**Response:**
```json
{
  "success": true,
  "data": {
    "messages": [
      {
        "id": "message-id",
        "content": "Hello there!",
        "senderId": "sender-id",
        "receiverId": "receiver-id",
        "timestamp": "2024-01-01T12:00:00.000Z",
        "read": false
      }
    ],
    "pagination": {
      "total": 100,
      "limit": 20,
      "offset": 0,
      "hasMore": true
    }
  }
}
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized
- `404` - User not found

---

### POST /api/sendMessage
**Purpose:** Send a message to another user

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "receiverId": "user-id",
  "content": "Hello, how are you?",
  "type": "text"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully",
  "data": {
    "id": "message-id",
    "content": "Hello, how are you?",
    "senderId": "sender-id",
    "receiverId": "receiver-id",
    "timestamp": "2024-01-01T12:00:00.000Z",
    "type": "text"
  }
}
```

**Status Codes:**
- `201` - Message sent
- `400` - Validation error
- `401` - Unauthorized
- `404` - Receiver not found

---

## ⚡ WebSocket Events

### Connection Setup
```javascript
const socket = io('http://localhost:3000', {
  auth: {
    token: 'your-jwt-token'
  }
});

// Handle connection events
socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('connect_error', (error) => {
  console.error('Connection error:', error);
});
```

### 🏠 Room Management

#### Join Room
```javascript
socket.emit('join-room', { 
  roomId: 'room-id' 
});

// Listen for join confirmation
socket.on('joined-room', (data) => {
  console.log('Joined room:', data.roomId);
});
```

#### Leave Room
```javascript
socket.emit('leave-room', { 
  roomId: 'room-id' 
});

// Listen for leave confirmation
socket.on('left-room', (data) => {
  console.log('Left room:', data.roomId);
});
```

### 💬 Real-time Messaging

#### Send Message
```javascript
socket.emit('send-message', {
  roomId: 'room-id',
  message: 'Hello world!',
  type: 'text'
});
```

#### Receive Messages
```javascript
socket.on('new-message', (data) => {
  console.log('New message:', {
    id: data.id,
    content: data.message,
    sender: data.sender,
    timestamp: data.timestamp,
    roomId: data.roomId
  });
});
```

#### Typing Indicators
```javascript
// Send typing indicator
socket.emit('typing', {
  roomId: 'room-id',
  isTyping: true
});

// Listen for typing indicators
socket.on('user-typing', (data) => {
  console.log(`${data.username} is typing...`);
});
```

### 🔔 Notifications

#### Online Status
```javascript
socket.on('user-online', (data) => {
  console.log(`${data.username} is online`);
});

socket.on('user-offline', (data) => {
  console.log(`${data.username} is offline`);
});
```

#### Message Status
```javascript
socket.on('message-delivered', (data) => {
  console.log(`Message ${data.messageId} delivered`);
});

socket.on('message-read', (data) => {
  console.log(`Message ${data.messageId} read`);
});
```

---

## 🔧 Error Handling

### Standard Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "error": {
    "code": "ERROR_CODE",
    "details": "Detailed error information"
  }
}
```

### Common Error Codes
| Code | Description |
|------|-------------|
| `VALIDATION_ERROR` | Request validation failed |
| `UNAUTHORIZED` | Invalid or missing authentication |
| `FORBIDDEN` | Access denied |
| `NOT_FOUND` | Resource not found |
| `CONFLICT` | Resource already exists |
| `SERVER_ERROR` | Internal server error |

---

## 📊 Rate Limiting

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/api/register` | 5 requests | 15 minutes |
| `/api/login` | 10 requests | 15 minutes |
| `/api/sendMessage` | 100 requests | 1 minute |
| Other endpoints | 1000 requests | 15 minutes |

---

## 🧪 Testing with cURL

### Register User
```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Profile
```bash
curl -X GET http://localhost:3000/api/getProfile \
  -H "Authorization: Bearer your-jwt-token"
```

---

## 📝 Notes

- All timestamps are in ISO 8601 format (UTC)
- File uploads are base64 encoded in request bodies
- WebSocket connections require authentication
- Rate limiting is applied per IP address
- All API responses include a `success` boolean field