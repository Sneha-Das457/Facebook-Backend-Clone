# Facebook Backend Clone

A RESTful API backend implementation for a Facebook-like social media platform, built with Node.js and Express.js.

## 🚀 Features

- User authentication and authorization using JWT
- Secure password hashing with bcrypt
- RESTful API architecture
- MongoDB database integration with Mongoose
- Error handling utilities
- Async request handling
- Structured MVC-like architecture

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js 5.1.0
- **Database:** MongoDB (Mongoose 8.20.0)
- **Authentication:** JSON Web Token (JWT)
- **Password Hashing:** bcrypt
- **Environment Variables:** dotenv
- **Development:** nodemon

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance like MongoDB Atlas)

## 🔧 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Facebook_Backend_Clone
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/facebook_clone
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

4. Update the MongoDB connection string with your database credentials.

## 📁 Project Structure

```
Facebook_Backend_Clone/
├── src/
│   ├── config/          # Configuration files (database, etc.)
│   ├── controllers/     # Request handlers
│   ├── middlewares/     # Custom middleware functions
│   ├── models/          # Mongoose models/schemas
│   ├── routers/         # API route definitions
│   └── utils/           # Utility functions
│       ├── apiError.js      # Custom error class
│       ├── apiResponse.js   # API response utility
│       └── asyncHandler.js  # Async error handler wrapper
├── index.js             # Application entry point
├── package.json         # Project dependencies
└── README.md           # Project documentation
```

## 🚦 Getting Started

1. Start MongoDB service (if running locally):
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

2. Run the development server:
```bash
npm start
```

Or with nodemon for auto-reload:
```bash
npx nodemon index.js
```

3. The server will start on the port specified in your `.env` file (default: 3000).

## 📝 API Structure

The API follows RESTful conventions with the following structure:

- **Controllers:** Handle business logic and request processing
- **Models:** Define database schemas and models
- **Routers:** Define API endpoints and route handlers
- **Middlewares:** Handle authentication, validation, and other cross-cutting concerns
- **Utils:** Provide reusable utility functions

### Utility Classes

- **apiError:** Custom error class for consistent error responses
- **apiResponse:** Standardized API response format
- **asyncHandler:** Wrapper for async route handlers to catch errors

## 🔐 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Secure cookie handling
- Environment variable configuration

## 📦 Dependencies

- `express` - Web framework
- `mongoose` - MongoDB object modeling
- `jsonwebtoken` - JWT authentication
- `bcrypt` - Password hashing
- `cookie-parser` - Cookie parsing middleware
- `dotenv` - Environment variable management
- `nodemon` - Development auto-reload tool

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

ISC

## 👤 Author

Neha

## 📞 Support

For support, please open an issue in the repository.

---

**Note:** This is a backend implementation. Make sure to configure your frontend application to connect to this API server.









