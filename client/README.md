# Todo App - Frontend

This is the frontend for the MERN Todo Application, built using React, Vite, and Tailwind CSS. It provides a clean, responsive, and interactive user interface to manage tasks.

## Setup and Installation

Follow these instructions to get the frontend up and running on your local machine.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation Steps

1. Navigate to the frontend directory (if you aren't already there):

   ```bash
   cd frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Configure Environment Variables (if required):
   - Create a `.env` file in the root of the `frontend` directory.
   - Add the backend API URL. For example:
     ```env
     VITE_API_URL=http://localhost:5000/api
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   The application should now be running at `http://localhost:5173` (or the port specified by Vite).

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run preview`: Locally preview the production build.
- `npm run lint`: Runs ESLint to check for code quality.

## Assumptions and Limitations

- **Backend Dependency:** The frontend assumes the backend server is running and accessible at the specified `VITE_API_URL`. If the backend is down, API calls will fail, and data won't be loaded or saved.

- **Environment Variables:** It's assumed that the correct backend URL is configured in the environment variables before running or building the app.

- **Browser Compatibility:** Designed for modern web browsers. Some very old browsers might have styling or functional inconsistencies due to modern CSS and JS features.

- **Local State vs Server State:** The app may use optimistic UI updates. If an API request fails after a UI update, there might be a temporary mismatch between the UI state and the database state until refreshed or handled by error boundaries.
