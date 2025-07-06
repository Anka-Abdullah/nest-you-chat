
 # API Documentation
 
 ## Authentication Endpoints
 
### POST /api/register
 Register new user
 \`\`\`json
 {
   "username": "john_doe",
   "email": "john@example.com",
   "password": "password123"
 }
 \`\`\`
 
### POST /api/login
 Login user
 \`\`\`json
 {
   "email": "john@example.com",
   "password": "password123"
 }
 \`\`\`
 

### GET /api/getProfile
 Get current user profile
 Headers: `Authorization: Bearer <token>`
 
### PUT /api/createProfile
Create profile
Headers: `Authorization: Bearer <token>`

### PUT /api/updateProfile
 Update user profile
 Headers: `Authorization: Bearer <token>`
 
 ## Chat Endpoints
 
### GET /api/viewMessages?user=<id>
Get chat messages with specific user
 Headers: `Authorization: Bearer <token>`
 
### POST /api/sendMessage
Send message to user
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
