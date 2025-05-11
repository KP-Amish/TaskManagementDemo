# Task Management System

A full-stack web application for managing tasks, built with React, Redux, Node.js, Express, and MongoDB.

## Features

- Responsive design using Bootstrap
- Dynamic client-side interactions with JavaScript and jQuery
- React components for UI rendering
- Redux for state management
- React Router for navigation
- Complete CRUD operations via RESTful API
- MongoDB database integration using Mongoose

## Project Structure

- `frontend/`: React application built with Vite
- `backend/`: Node.js server with Express and MongoDB

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- MongoDB (local installation or Atlas account)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/task-management-system.git
   cd task-management-system
   ```

2. Install server dependencies
   ```
   npm install
   ```

3. Install frontend dependencies
   ```
   cd frontend
   npm install
   cd ..
   ```

4. Create a `.env` file in the root directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/task-manager
   ```
   
   Note: Replace the MONGO_URI with your MongoDB connection string if using MongoDB Atlas.

### Running the Application

1. Run both frontend and backend concurrently:
   ```
   npm run dev
   ```

2. Or run separately:
   - Backend server: `npm run server`
   - Frontend: `npm run client`

3. Access the application at `http://localhost:5173` (Vite default port)

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `PATCH /api/tasks/:id/toggle` - Toggle task completion status

## Technologies Used

- Frontend:
  - React (with functional components and hooks)
  - Redux (with Redux Thunk)
  - React Router
  - Bootstrap
  - jQuery for animations
  - Axios for API requests

- Backend:
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - RESTful API architecture

## Deployment

- Frontend: Build with `cd frontend && npm run build`
- Deploy the built frontend to a static hosting service (Netlify, Vercel, etc.)
- Deploy the backend to a Node.js hosting platform (Heroku, Render, etc.)