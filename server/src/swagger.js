import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "BookSync Auth API",
    description: "API documentation for BookSync authentication endpoints.",
    version: "1.0.0",
  },
  host: "localhost:8000",
  basePath: "/api/auth",
  schemes: ["http"],
  tags: [
    { name: "User", description: "User Authentication" },
    { name: "Admin", description: "Admin Authentication" },
  ],
  definitions: {
    UserRegistrationRequest: {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "SecurePassword123",
    },
    UserRegistrationResponse: {
      message: "OTP sent successfully, please check your email",
    },
    VerifyUserRequest: {
      name: "John Doe",
      email: "johndoe@example.com",
      otp: "1234",
      password: "SecurePassword123",
    },
    VerifyUserResponse: {
      message: "User registered successfully",
    },
    LoginUserRequest: {
      email: "johndoe@example.com",
      password: "SecurePassword123",
    },
    LoginUserResponse: {
      message: "Login successful",
      accessToken: "jwt-access-token",
      refreshToken: "jwt-refresh-token",
    },
    AdminRegistrationRequest: {
      name: "Admin User",
      email: "admin@example.com",
      password: "AdminPassword123",
    },
    AdminRegistrationResponse: {
      message: "OTP sent successfully, please check your email",
    },
    ErrorResponse: {
      message: "Error message",
      field: "email",
    },
  },
  paths: {
    "/user-register": {
      post: {
        tags: ["User"],
        summary: "Register a new user",
        description: "Registers a user and sends a 4-digit OTP to their email.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/definitions/UserRegistrationRequest" },
            },
          },
        },
        responses: {
          200: {
            description: "OTP sent",
            schema: { $ref: "#/definitions/UserRegistrationResponse" },
          },
          400: {
            description: "Validation error",
            schema: { $ref: "#/definitions/ErrorResponse" },
          },
        },
      },
    },
    "/verify-user": {
      post: {
        tags: ["User"],
        summary: "Verify user OTP and complete registration",
        description: "Verifies the OTP and creates the user account.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/definitions/VerifyUserRequest" },
            },
          },
        },
        responses: {
          201: {
            description: "User registered",
            schema: { $ref: "#/definitions/VerifyUserResponse" },
          },
          400: {
            description: "Validation error",
            schema: { $ref: "#/definitions/ErrorResponse" },
          },
        },
      },
    },
    "/login-user": {
      post: {
        tags: ["User"],
        summary: "Login user",
        description: "Logs in a user and returns JWT tokens.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/definitions/LoginUserRequest" },
            },
          },
        },
        responses: {
          200: {
            description: "Login successful",
            schema: { $ref: "#/definitions/LoginUserResponse" },
          },
          400: {
            description: "Validation error",
            schema: { $ref: "#/definitions/ErrorResponse" },
          },
        },
      },
    },
    "/admin-register": {
      post: {
        tags: ["Admin"],
        summary: "Register a new admin",
        description:
          "Registers an admin and sends a 4-digit OTP to their email.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/definitions/AdminRegistrationRequest" },
            },
          },
        },
        responses: {
          200: {
            description: "OTP sent",
            schema: { $ref: "#/definitions/AdminRegistrationResponse" },
          },
          400: {
            description: "Validation error",
            schema: { $ref: "#/definitions/ErrorResponse" },
          },
        },
      },
    },
  },
};

const outputFile = "./src/swagger-output.json";
const endpointsFiles = ["./src/routes/authRouter.ts"];

swaggerAutogen(outputFile, endpointsFiles, doc);
