# Team Task Management System (MERN)

A simple MERN stack app with role-based access:
- **Super Admin**: create teams, view all users, assign users to teams (team member assignment APIs included)
- **Team Admin**: create tasks, view tasks in their team, update task status
- **Member**: view tasks assigned to them, mark tasks as completed

## Tech Stack
- MongoDB + Mongoose
- Express.js
- JWT Authentication
- React

## Project Structure
- `backend/` - Express + MongoDB
- `frontend/` - React frontend

## Setup

### 1) Backend
```bash
cd backend
npm install
```
Create a `.env` file in `backend/`:
```env
PORT=5000
JWT_SECRET=your_jwt_secret
MONGO_URI=your_mongodb_connection_string
```
Start server:
```bash
npm start
```

### 2) Frontend
```bash
cd frontend
npm install
```
Start frontend:
```bash
npm start
```

## API Base URL
Frontend calls backend at:
- `http://localhost:5000/api`

## Roles
JWT payload includes:
- `id`, `role`, `team`

## Notes
- Super Admin and Team Admin/Member permissions are enforced in backend controllers.
- Team Admin and Member task access is scoped to their team.


