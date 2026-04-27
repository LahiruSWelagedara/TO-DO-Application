🚀 Full-Stack MERN TODO Application

This is a full-stack task management application developed using the MERN stack (MongoDB, Express.js, React, Node.js). The project follows a monorepo architecture, allowing both frontend and backend to be managed efficiently in a single repository.

🏗️ Project Architecture

The application is structured into two main workspaces:

client/ – React frontend providing an interactive user interface for task management
server/ – Node.js + Express backend exposing a RESTful API
Database – MongoDB (via Mongoose) for persistent data storage

🛠️ Quick Start (Monorepo)

Run both frontend and backend together:

npm install
npm run start --workspaces

Environment Setup

Create a .env file inside the server/ directory:
PORT=5000
MONGODB_URI=your_mongodb_connection_string


🖥️ Frontend (Client)

Tech Stack
React.js
CSS3 (or any UI library)


Setup

cd client
npm install
npm run dev


Features
View all tasks with clear UI distinction for completed items
Add new tasks
Edit existing tasks
Delete tasks
Toggle task status (done/undone)
Handles loading and error states smoothly


⚙️ Backend (Server)

Tech Stack

Node.js
Express.js
MongoDB
Mongoose

Setup

cd server
npm install
npm run dev


🗄️ Database Configuration

Uses MongoDB Atlas or local MongoDB instance
Connection handled via MONGODB_URI in .env
Ensure your IP address is whitelisted in MongoDB Atlas
