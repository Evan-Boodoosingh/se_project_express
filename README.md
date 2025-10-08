# WTWR (What to Wear?) - Backend API

A robust Express.js backend API for the WTWR (What to Wear) application. This server provides user authentication, clothing item management, and weather-based recommendations with comprehensive security, validation, and logging.

## 🌐 Live Deployment

- **Production API**: https://api.what2wear.blinklab.com
- **Main Website**: https://what2wear.blinklab.com
- **Process Manager**: PM2 with auto-restart functionality
- **Reverse Proxy**: nginx configured for port forwarding

## 🔗 Related Repositories

- **Frontend**: [se_project_react](https://github.com/Evan-Boodoosingh/se_project_react.git) - React frontend application
- **Backend**: This repository - Express.js backend with MongoDB

## 🎥 Project Pitch Video

Check out [this video](https://www.loom.com/share/99eab244e924443a9f59934b2480be95?sid=496eac4b-cfd3-4fbb-b350-af5ed646c749), where I describe my project and some challenges I faced while building it.

## 🚀 Features

### 🔐 Authentication & Security

- **JWT Authentication**: Secure token-based user authentication
- **Password Hashing**: bcrypt for secure password storage
- **Protected Routes**: Middleware-protected API endpoints
- **Environment Variables**: Secure configuration with dotenv
- **CORS Configuration**: Cross-origin resource sharing setup

### 👔 Clothing Items API

- **CRUD Operations**: Create, read, update, delete clothing items
- **User Ownership**: Items linked to user accounts
- **Like System**: Users can like/unlike items
- **Weather Categories**: Items categorized by weather conditions (hot, warm, cold)
- **Image Support**: URL-based image storage

### 👤 User Management

- **User Registration**: Account creation with validation
- **User Login**: Secure authentication with JWT tokens
- **Profile Updates**: Users can update name and avatar
- **User Profiles**: Individual user data management

### 🛡️ Middleware & Validation

- **Request Validation**: Joi and Celebrate for input validation
- **Error Handling**: Centralized error management with custom error classes
- **Logging**: Winston-based request and error logging
- **Input Sanitization**: Validator.js for data validation

## 🛠️ Tech Stack

### Core Technologies

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken) + bcrypt

### Security & Validation

- **Validation**: Joi + Celebrate + Validator.js
- **Environment**: dotenv for configuration
- **CORS**: Cross-origin resource sharing

### Logging & Monitoring

- **Request Logging**: Winston + Express-Winston
- **Error Tracking**: Centralized error logging
- **Production Monitoring**: PM2 process management

## 📡 API Endpoints

### Authentication

```
POST /signup    - User registration
POST /signin    - User login
```

### Users (Protected)

```
GET /users/me    - Get current user profile
PATCH /users/me  - Update user profile
```

### Clothing Items

```
GET /items                    - Get all items (public)
POST /items                   - Create new item (protected)
DELETE /items/:itemId         - Delete item (protected, owner only)
PUT /items/:itemId/likes      - Like item (protected)
DELETE /items/:itemId/likes   - Unlike item (protected)
```

### Health Check

```
GET /              - API health check
GET /crash-test    - Server crash test for PM2 validation
```

## 🚀 Running the Project

### Development

```bash
npm install           # Install dependencies
npm run dev          # Start with nodemon (hot reload)
npm run start        # Start production server
```

### Production Deployment

```bash
# Environment setup
NODE_ENV=production
JWT_SECRET=your-super-secure-secret-key
PORT=3001

# Start with PM2
pm2 start app.js --name "wtwr-api"
pm2 startup
pm2 save
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
JWT_SECRET=your-super-secure-jwt-secret-key
PORT=3001
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/wtwr_db
```

### MongoDB Setup

- Database: `wtwr_db`
- Collections: `users`, `items`
- Connection: Local MongoDB instance on port 27017

## 🧪 Testing & Validation

### Crash Test Endpoint

The `/crash-test` endpoint is included for testing PM2 auto-restart functionality:

```bash
curl http://localhost:3001/crash-test
```

This will crash the server, and PM2 should automatically restart it.

### Sprint Validation

Update `sprint.txt` with current sprint number (12 or 13) before committing.

## 📂 Project Structure

```
├── app.js                 # Main application entry point
├── controllers/           # Route handlers
│   ├── clothingItems.js   # Clothing items logic
│   └── users.js          # User authentication & profile logic
├── middlewares/          # Custom middleware
│   ├── auth.js           # JWT authentication middleware
│   ├── error-handler.js  # Centralized error handling
│   ├── logger.js         # Winston logging configuration
│   └── validation.js     # Joi/Celebrate validation schemas
├── models/               # Mongoose data models
│   ├── clothingItem.js   # Clothing item schema
│   └── user.js          # User schema with auth methods
├── routes/               # Express route definitions
│   ├── clothingItems.js  # Clothing items routes
│   ├── index.js          # Main router with auth routes
│   └── users.js          # User profile routes
└── utils/                # Utility functions
    ├── config.js         # Environment configuration
    └── errors.js         # Custom error classes
```

## 🔒 Security Features

### Error Handling

Custom error classes with proper HTTP status codes:

- `DocumentNotFoundErrorClass` (404)
- `UnauthorizedErrorClass` (401)
- `ForbiddenErrorClass` (403)
- `ConflictErrorClass` (409)
- `InternalServerErrorClass` (500)

### Validation Schemas

Comprehensive input validation for:

- User registration/login
- Clothing item creation
- Profile updates
- MongoDB ObjectId validation

### Logging

- **Request Logs**: All HTTP requests logged to `request.log`
- **Error Logs**: All errors logged to `error.log`
- **Console Logging**: Development-friendly console output

## 🚀 Deployment

### Production Environment

- **Server**: Google Cloud Platform
- **Domain**: api.what2wear.blinklab.com
- **Process Manager**: PM2 with auto-restart
- **Reverse Proxy**: nginx for port forwarding (80 → 3001)
- **Database**: MongoDB instance
- **SSL**: Configured for HTTPS support

### Deployment Commands

```bash
# Build and deploy (run on server)
git pull origin main
npm install --production
pm2 restart wtwr-api
```

Built with ❤️ using Node.js and Expresshat to Wear?: Back End
The back-end project is focused on creating a server for the WTWR application. You’ll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization.

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12
