# Candidate Shortlisting Management System (FSD-10)

A full-stack system designed for recruiters and HR personnel to manage candidate applications with a fixed status workflow.

## Tech Stack
- **Frontend**: React (Vite), Axios, React Router, CSS
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT
- **Authentication**: JWT-based with Role-Based Access Control (RBAC)

## User Roles & Permissions
- **RECRUITER**:
  - Register and login.
  - View candidate applications.
  - Update candidate status (APPLIED → SHORTLISTED → REJECTED).
- **HR**:
  - Login.
  - View all candidates and their current statuses.
  - Oversee the shortlisting process.

## Business Rules
- Candidate status flow is strictly: **APPLIED → SHORTLISTED → REJECTED**.
- Skipping steps or reversing status is not allowed.
- Only Recruiters can update candidate status.

## API Endpoints
### Auth
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login and get JWT.

### Candidates
- `GET /api/candidates`: Fetch all candidates (Protected).
- `POST /api/candidates`: Create a new candidate application (Recruiter only).
- `PUT /api/candidates/:id/status`: Update candidate status (Recruiter only, follows transition logic).

## Database Schema
### User
- `name` (String)
- `email` (String, Unique)
- `password` (Hashed)
- `role` (Enum: RECRUITER, HR)

### Candidate
- `name` (String)
- `email` (String, Unique)
- `education` (String)
- `experience` (String)
- `status` (Enum: APPLIED, SHORTLISTED, REJECTED)

## Setup Instructions
1. **Backend**:
   - `cd backend`
   - `npm install`
   - Configure `.env` with your `MONGO_URI` and `JWT_SECRET`.
   - `npm start`
2. **Frontend**:
   - `cd frontend`
   - `npm install`
   - `npm run dev`
