# Local Authentication Service

A production-ready TypeScript authentication service with JWT tokens, password hashing, and comprehensive validation.

## Features

✅ **User Registration** - Create new accounts with username, email, and password  
✅ **User Login** - Authenticate with username/email and password  
✅ **JWT Tokens** - Secure token-based authentication  
✅ **Password Hashing** - Bcrypt with 10 salt rounds  
✅ **Automatic Timestamps** - createdAt and updatedAt fields  
✅ **Input Validation** - Email format, password strength, field requirements  
✅ **Error Handling** - Custom error classes with proper HTTP status codes  
✅ **Security** - Helmet, CORS, and security best practices  
✅ **TypeScript** - Full type safety throughout the application  

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Security**: helmet, cors

## Project Structure

```
local-auth/
├── src/
│   ├── config/
│   │   ├── db.ts              # MongoDB connection
│   │   └── env.ts             # Environment configuration
│   ├── models/
│   │   └── User.ts            # User model with schema
│   ├── middleware/
│   │   ├── auth.ts            # JWT authentication
│   │   └── validation.ts      # Input validation
│   ├── routes/
│   │   └── auth.routes.ts     # Auth endpoints
│   ├── controllers/
│   │   └── auth.controller.ts # Auth business logic
│   ├── utils/
│   │   ├── jwt.ts             # JWT utilities
│   │   └── errors.ts          # Custom errors
│   └── index.ts               # Server entry point
├── .env                       # Environment variables
├── .env.example               # Environment template
├── tsconfig.json              # TypeScript config
└── package.json               # Dependencies
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or remote instance)
- Yarn package manager

### Installation

Dependencies are already installed. If you need to reinstall:

```bash
cd local-auth
yarn install
```

### Configuration

1. The `.env.example` file has been provided as a template
2. **Create a `.env` file** by copying from `.env.example`:

```bash
# In PowerShell
Copy-Item .env.example .env
```

3. Update the `.env` file with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/local-auth

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d
```

> [!IMPORTANT]
> **Change the JWT_SECRET** to a strong, random string in production!

### Running the Application

**Development mode** (with auto-reload):
```bash
yarn dev
```

**Build for production**:
```bash
yarn build
```

**Run production build**:
```bash
yarn start
```

## API Endpoints

### Base URL
```
http://localhost:5000
```

### Health Check
```http
GET /health
```

Returns server status.

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "65abc123...",
      "username": "johndoe",
      "email": "john@example.com",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "SecurePass123"
}
```

> **Note**: The `username` field accepts either username or email.

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "65abc123...",
      "username": "johndoe",
      "email": "john@example.com",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Get Current User (Protected)
```http
GET /api/auth/me
Authorization: Bearer <your-jwt-token>
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "65abc123...",
      "username": "johndoe",
      "email": "john@example.com",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

## Validation Rules

### Registration
- **Username**: 3-30 characters, alphanumeric and underscores only
- **Email**: Valid email format
- **Password**: Minimum 8 characters, must contain:
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number

### Login
- **Username**: Required (can be username or email)
- **Password**: Required

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

**Common error codes**:
- `400` - Validation Error
- `401` - Authentication Error (invalid credentials, expired token)
- `404` - Not Found
- `409` - Conflict (username/email already exists)
- `500` - Internal Server Error

## Security Features

- ✅ **Password Hashing**: Bcrypt with 10 salt rounds
- ✅ **JWT Tokens**: Signed tokens with expiration
- ✅ **Security Headers**: Helmet middleware
- ✅ **CORS**: Cross-origin resource sharing enabled
- ✅ **Input Validation**: Comprehensive validation for all inputs
- ✅ **Password Not Returned**: Passwords excluded from API responses
- ✅ **Unique Constraints**: Username and email must be unique

## Testing with PowerShell

### Register a user:
```powershell
$body = @{
    username = "testuser"
    email = "test@example.com"
    password = "Test123456"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method POST -Body $body -ContentType "application/json"
```

### Login:
```powershell
$body = @{
    username = "testuser"
    password = "Test123456"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -Body $body -ContentType "application/json"
$token = $response.data.token
```

### Use protected endpoint:
```powershell
$headers = @{
    Authorization = "Bearer $token"
}

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/me" -Method GET -Headers $headers
```

## Database Schema

**User Collection**:
```typescript
{
  username: string (unique, 3-30 chars)
  email: string (unique, valid format)
  password: string (hashed, min 8 chars)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-updated)
}
```

## Next Steps

1. **Start MongoDB** if not already running
2. **Create `.env` file** from `.env.example`
3. **Run the server**: `yarn dev`
4. **Test the endpoints** using the examples above

## Troubleshooting

**MongoDB Connection Error**:
- Ensure MongoDB is running on your system
- Check the `MONGODB_URI` in your `.env` file
- Try connecting to: `mongodb://localhost:27017/local-auth`

**Port Already in Use**:
- Change the `PORT` value in `.env` to a different port
- Or stop the process using port 5000

**Missing Environment Variables**:
- Ensure `.env` file exists (copy from `.env.example`)
- Check that all required variables are set:
  - `MONGODB_URI`
  - `JWT_SECRET`

## License

ISC
