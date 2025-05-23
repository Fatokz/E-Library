# BookSync Library & Book Management API

## Overview

BookSync is a comprehensive library and book management backend API built with Node.js, Express, TypeScript, and MongoDB. It supports user and admin authentication, book management, reviews, comments, borrowing, and personal todo lists.

---

## Features

- **User & Admin Authentication:** Registration, OTP verification, login, JWT-based auth.
- **Book Management:** Admins can add, update, delete books (with Cloudinary image upload, Markdown descriptions, and rich metadata).
- **Reviews & Comments:** Users can add reviews (with ratings) and comments to books.
- **Borrowing:** Users can borrow and return hardcopy books.
- **Todo List:** Users can manage personal todos with target completion dates.

---

## Project Structure

```
src/
  controller/
    admin/
    auth/
    book/
    borrow/
    comment/
    review/
    user/
  middleware/
  model/
  routes/
  utils/
  types/
server.ts
```

---

## Installation

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd booksync/server
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**  
   Create a `.env` file with:
   ```
   MONGO_URI=your_mongodb_uri
   ACCESS_TOKEN_SECRET=your_jwt_secret
   REFRESH_TOKEN_SECRET=your_jwt_refresh_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```
4. **Start the server:**
   ```sh
   npm start
   ```
   The API will be available at `http://localhost:8080/api`.

---

## API Endpoints

### **Authentication**

- `POST /api/auth/user-register` — Register a new user (sends OTP).
- `POST /api/auth/verify-user` — Verify OTP and complete user registration.
- `POST /api/auth/login` — Login as user or admin.
- `POST /api/auth/admin-register` — Register a new admin (admin only, sends OTP).
- `POST /api/auth/verify-admin` — Verify OTP and complete admin registration.

### **Books**

- `GET /api/books` — Get all books.
- `GET /api/books/:id` — Get a single book by ID.
- `GET /api/books/search?q=term` — Search books by title, author, or category.
- `PUT /api/books/:id` — Update a book (admin only, supports image upload).
- `DELETE /api/books/:id` — Delete a book (admin only).

### **Admin Book Management**

- `POST /api/admin/add-book` — Add a new book (admin only, supports image upload).

### **Reviews**

- `POST /api/reviews/:bookId` — Add a review to a book (user).
- `DELETE /api/reviews/:reviewId` — Delete a review (user or admin).

### **Comments**

- `POST /api/comments/:bookId` — Add a comment to a book (user).
- `DELETE /api/comments/:commentId` — Delete a comment (user or admin).

### **Borrowing**

- `POST /api/borrows/:bookId` — Borrow a hardcopy book (user).
- `POST /api/borrows/return/:borrowId` — Return a borrowed book (user).
- `GET /api/borrows` — Get all borrows for the logged-in user.

### **Todos**

- `POST /api/todos` — Add a todo (user).
- `GET /api/todos` — Get all todos for the user.
- `PUT /api/todos/:id` — Update a todo.
- `DELETE /api/todos/:id` — Delete a todo.

---

## Book Schema

- `title` (string, required)
- `description` (string, Markdown supported, required)
- `image` (string, Cloudinary URL, required)
- `author` (string, required)
- `category` (string, required)
- `pages` (number, required)
- `publishedDate` (string, required)
- `availability` ("hardcopy" | "ebook" | "audio", required)
- `isPaid` (boolean, required)
- `price` (number, optional)
- `status` ("borrowable" | "not-borrowable", required)
- `isInShelf` (boolean, optional)
- `rating` (number, default 0)
- `reviewCount` (number, default 0)
- `reviews` (array of Review IDs)
- `comments` (array of Comment IDs)
- `createdBy` (Admin ID, required)

---

## Usage Notes

- **Authentication:** Use the JWT access token in the `Authorization: Bearer <token>` header for protected routes.
- **Image Upload:** For book creation/updating, send the image as a `multipart/form-data` field named `image`.
- **Markdown:** Book descriptions can be Markdown; render on the frontend as needed.
- **Borrowing:** Only hardcopy books with `status: "borrowable"` can be borrowed.

---

## Technologies Used

- Node.js
- Express.js
- TypeScript
- MongoDB & Mongoose
- Cloudinary (image storage)
- Multer (file upload)
- JWT (authentication)
- Nodemailer (email/OTP)
- Swagger (API docs)

---

## License

This project is licensed under the MIT License.
