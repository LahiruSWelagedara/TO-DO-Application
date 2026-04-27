# Todo App - Backend

This is the backend for the MERN Todo Application. It is built using Node.js, Express, and MongoDB (via Mongoose), providing a RESTful API to manage tasks for the frontend application.

## Setup and Installation

Follow these instructions to set up and run the backend server on your local machine.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager
- A MongoDB Database (either a local MongoDB instance or a cloud cluster like MongoDB Atlas)

### Installation Steps

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Configure Environment Variables:
   - Create a `.env` file in the root of the `backend` directory.
   - Add your environment variables, specifically the port and MongoDB connection string.
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string_here
     ```

### MongoDB Connection Notes

You can use either a local MongoDB installation or MongoDB Atlas for your database.

- **MongoDB Atlas (Cloud):** Your `MONGO_URI` will look something like `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/todo_db?retryWrites=true&w=majority`. Make sure to replace `<username>`, `<password>`, and `todo_db` with your actual credentials and desired database name. Also, ensure your current IP address is whitelisted in the MongoDB Atlas Network Access settings.
- **Local MongoDB:** If you are running MongoDB locally, your connection string will typically be `mongodb://localhost:27017/todo_db`.

4. Start the server:
   - For development (using node directly as per package.json):
     ```bash
     npm run dev
     ```
     The server will start and typically listen on port 5000 (or the port you specified in the `.env` file). You should see a message confirming the server is running and the database is connected.

## Scripts

- `npm start` / `npm run dev`: Starts the Node.js server using `server.js`.

## Assumptions and Limitations

- **Security:** The current implementation might be a basic REST API without advanced authentication/authorization (like JWT) unless implemented. It's assumed to be for single-user or demonstrative purposes. For production, robust security measures are required.

- **CORS Configuration:** It is assumed that the `cors` middleware is configured to accept requests from the frontend's origin (e.g., `http://localhost:5173`). If the frontend is hosted elsewhere, the CORS configuration in the server file must be updated accordingly.

- **Database Availability:** The backend relies entirely on MongoDB being accessible. If the database connection fails, API requests will fail or hang.

- **Rate Limiting:** There is no built-in rate limiting out-of-the-box in this standard setup, which could leave the API vulnerable to abuse if exposed publicly without a reverse proxy (like Nginx) handling it.
