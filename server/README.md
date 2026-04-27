# Todo App Backend

A RESTful API implementation backend for the Todo app created using Node.js, Express.js, and MongoDB.

## Features
- RESTful API implementation
- MongoDB integration via Mongoose
- CORS support
- CRUD operations on todos (Create, Read, Update, Delete)
- Validation and error handling

## Technologies Used
- **Node.js**
- **Express.js**
- **MongoDB & Mongoose**
- **dotenv** (environment variables)
- **cors**

## Prerequisites
- Node.js (version 18+)
- MongoDB (local or MongoDB Atlas)

## Installation

1. Install required packages:
   ```sh
   npm install
   ```

2. Set up the environment by creating an environment variable (.env) in the backend folder and adding a MongoDB connection string (optional and default to local MongoDB):
   ```
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/todo-app
   ```

3. Run the development server:
   ```sh
   npm start
   # or for development (auto restart if nodemon installed)
   npm run dev
   ```

4. API endpoints can be accessed using the following URL: http://localhost:5000/api/todos

## Endpoints
- GET /api/todos
- POST /api/todos
- PUT /api/todos/:id
- PATCH /api/todos/:id/done
- DELETE /api/todos/:id