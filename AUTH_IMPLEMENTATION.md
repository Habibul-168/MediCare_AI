# Authentication Implementation

## Overview
Added JWT-based authentication system with action-level protection for Telemedicine, Health Checkup, and Medicine Store services.

## Protected Actions (Require Sign In)
1. **Telemedicine** - Users can browse doctors but need to sign in to:
   - Start Video Call
   - Schedule Appointment

2. **Health Checkup** - Users can view checkup types but need to sign in to:
   - Book Health Checkup

3. **Medicine Store** - Users can browse medicines and add to cart but need to sign in to:
   - Proceed to Checkout

4. **Health Records** - Entire page requires sign in

## Public Access (No Sign In Required)
- Browse all pages (Telemedicine, Health Checkup, Medicine Store)
- View doctors, checkup types, and medicines
- Add medicines to cart
- Symptom Checker
- Doctor Finder
- Emergency Services
- All other existing services

## Backend Changes

### New Files
- `backend/models/User.js` - User model with password hashing
- `backend/middleware/auth.js` - JWT authentication middleware
- `backend/routes/auth.js` - Login/Register endpoints
- `backend/routes/telemedicine.js` - Protected telemedicine routes
- `backend/routes/medicines.js` - Protected medicine store routes

### Modified Files
- `backend/routes/checkups.js` - Added auth middleware
- `backend/server.js` - Added new routes

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
  ```json
  { "name": "string", "email": "string", "password": "string", "phone": "string" }
  ```
- `POST /api/auth/login` - Login user
  ```json
  { "email": "string", "password": "string" }
  ```

#### Protected Routes (Require Authorization Header)
- `GET /api/telemedicine/sessions` - Get telemedicine sessions
- `POST /api/telemedicine/book` - Book telemedicine session
- `GET /api/medicines/store` - Access medicine store
- `POST /api/medicines/order` - Place medicine order
- `POST /api/checkups/book` - Book health checkup

## Frontend Changes

### New Files
- `frontend/src/context/AuthContext.jsx` - Authentication state management
- `frontend/src/components/ProtectedRoute.jsx` - Route protection component
- `frontend/src/pages/Login.jsx` - Login page
- `frontend/src/pages/Register.jsx` - Register page

### Modified Files
- `frontend/src/App.jsx` - Added AuthProvider and protected routes
- `frontend/src/components/Navbar.jsx` - Integrated with AuthContext

### Usage
Users accessing protected routes will be automatically redirected to `/login` if not authenticated.

## Environment Variables
Add to `backend/.env`:
```
JWT_SECRET=your-secret-key
```

## Testing
1. Start backend: `cd backend && npm run dev`
2. Start frontend: `cd frontend && npm run dev`
3. Try accessing `/telemedicine`, `/health-checkup`, or `/medicines` without login
4. Register/Login and access protected routes
