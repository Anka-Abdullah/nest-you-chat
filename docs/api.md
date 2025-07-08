# API Documentation

## 🔐 Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

---

## 🔑 Auth Endpoints

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

**Purpose:** Authenticate user and receive an access token

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
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
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
  "id": "user-id",
  "username": "john_doe",
  "email": "john@example.com",
  "birthDate": "1990-01-01T00:00:00.000Z",
  "zodiac": "Capricorn",
  "horoscope": "Today brings opportunities for growth.",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
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
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "birthDate": "1990-01-01"
}
```

**Response:**

```json
{
  "id": "user-id",
  "username": "john_doe",
  "email": "john@example.com",
  "birthDate": "1990-01-01T00:00:00.000Z",
  "zodiac": "Capricorn",
  "horoscope": "Today brings opportunities for growth."
}
```

**Status Codes:**

- `201` - Profile created
- `400` - Validation error
- `401` - Unauthorized

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
  "username": "john_doe",
  "email": "john@example.com",
  "password": "newpassword",
  "birthDate": "1990-01-01"
}
```

**Response:**

```json
{
  "id": "user-id",
  "username": "john_doe",
  "email": "john@example.com",
  "birthDate": "1990-01-01T00:00:00.000Z",
  "zodiac": "Capricorn",
  "horoscope": "Today brings opportunities for growth."
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

**Example:**

```
GET /api/viewMessages?user=user-id
```

**Response:**

```json
[
  {
    "id": "message-id",
    "from": "sender-id",
    "to": "receiver-id",
    "content": "Hello there!",
    "createdAt": "2024-01-01T12:00:00.000Z"
  }
]
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
  "to": "user-id",
  "message": "Hello, how are you?"
}
```

**Response:**

```json
{
  "id": "message-id",
  "from": "sender-id",
  "to": "user-id",
  "content": "Hello, how are you?",
  "createdAt": "2024-01-01T12:00:00.000Z"
}
```

**Status Codes:**

- `201` - Message sent
- `400` - Validation error
- `401` - Unauthorized
- `404` - Receiver not found

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

| Code               | Description                       |
| ------------------ | --------------------------------- |
| `VALIDATION_ERROR` | Request validation failed         |
| `UNAUTHORIZED`     | Invalid or missing authentication |
| `FORBIDDEN`        | Access denied                     |
| `NOT_FOUND`        | Resource not found                |
| `CONFLICT`         | Resource already exists           |
| `SERVER_ERROR`     | Internal server error             |

---

## 📚 cURL Examples

### Register

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
- WebSocket connections require authentication
- Rate limiting is applied per IP address
- All API responses include a `success` boolean field

## \ud83d\udce1 WebSocket Testing with Postman
1. Jalankan aplikasi NestJS Anda.
2. Di Postman pilih **New** \-> **WebSocket Request**.
3. Masukkan URL `ws://localhost:3000/socket.io/?EIO=4&transport=websocket`.
4. Tambahkan header `Authorization: Bearer &lt;token>` bila diperlukan.
5. Kirim pesan dengan format:
   ```json
   { "event": "message", "data": "Hello" }
   ```
6. Pesan yang diterima dari server muncul pada panel *Messages*.