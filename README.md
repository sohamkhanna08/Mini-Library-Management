# Mini Library Management API

This is a backend API application for managing a library's inventory. It enables CRUD operations on books and allows filtering by genre and status (e.g. available, borrowed). It also supports user registration and login with JWT-based authentication to secure borrowing and returning operations. Built using Node.js, Express.js, MongoDB, and JWT for authentication.

## Features
- Create, read, update, and delete (CRUD) books with details like title, author, genre, and status.
- Filter books by genre and availability status.
- Mark books as "available," "borrowed," or "self-owned."
- User registration and authentication with secure password hashing and JWT.
- Token-based authorization for secure access to book management routes.

## Tech Stack
- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for routing and server-side logic.
- **MongoDB**: NoSQL database for storing book and user data.
- **JWT (jsonwebtoken)**: Manages user authentication tokens.
- **bcrypt**: Hashes passwords securely.

