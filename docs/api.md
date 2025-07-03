# API Documentation

## Authentication Endpoints

### POST /auth/register
Register new user
\`\`\`json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
\`\`\`

### POST /auth/login
Login user
\`\`\`json
{
  "email": "john@example.com",
  "password": "password123"
}
\`\`\`

### POST /auth/refresh
Refresh JWT token
\`\`\`json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
\`\`\`

## User Endpoints

### GET /users/profile
Get current user profile
Headers: `Authorization: Bearer <token>`

### PUT /users/profile
Update user profile
Headers: `Authorization: Bearer <token>`

## Chat Endpoints

### GET /chat/rooms
Get user's chat rooms
Headers: `Authorization: Bearer <token>`

### POST /chat/rooms
Create new chat room
Headers: `Authorization: Bearer <token>`

### GET /chat/rooms/:id/messages
Get messages from room
Headers: `Authorization: Bearer <token>`

## WebSocket Events

### Connection
\`\`\`javascript
const socket = io('http://localhost:3000', {
  auth: {
    token: 'your-jwt-token'
  }
});
\`\`\`

### Join Room
\`\`\`javascript
socket.emit('join-room', { roomId: 'room-id' });
\`\`\`

### Send Message
\`\`\`javascript
socket.emit('send-message', {
  roomId: 'room-id',
  message: 'Hello world!'
});
\`\`\`

### Receive Message
\`\`\`javascript
socket.on('new-message', (data) => {
  console.log('New message:', data);
});
\`\`\`