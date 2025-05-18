# Bookstore Authentication App

## Overview
This project is a Bookstore Authentication Application that provides user authentication features, including user registration, OTP verification, and login functionalities. It also supports admin user registration.

## Features
- User Registration: Allows users to register with their details and sends a 4-digit OTP for verification.
- OTP Verification: Users can verify their registration using the OTP sent to their email.
- User Login: Authenticates users and generates access and refresh tokens.
- Admin Registration: Allows admin users to register with similar functionalities as regular users.

## Project Structure
```
bookstore-auth-app
├── src
│   ├── controller
│   │   └── auth
│   │       └── authController.ts
│   ├── model
│   │   ├── admin.ts
│   │   └── user.ts
│   ├── routes
│   │   └── authRouter.ts
│   ├── utils
│   │   ├── Mailer
│   │   │   └── index.ts
│   │   ├── validateAuth.ts
│   │   └── errorHandler.ts
│   └── types
│       └── index.ts
├── server.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd bookstore-auth-app
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Usage
1. Start the server:
   ```
   npm start
   ```
2. Access the API at `http://localhost:8000/api/auth`.

## API Endpoints
- **POST /api/auth/user-register**: Register a new user.
- **POST /api/auth/verify-user**: Verify OTP for user registration.
- **POST /api/auth/login-user**: Login an existing user.
- **POST /api/auth/admin-register**: Register a new admin user.

## Technologies Used
- Node.js
- Express.js
- TypeScript
- MongoDB (for database)
- Nodemailer (for sending emails)

## License
This project is licensed under the MIT License.