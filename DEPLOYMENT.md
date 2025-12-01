# Deployment Guide for Render

## Backend Deployment

1. **Create a new Web Service on Render**
   - Connect your GitHub repository
   - Select the `backend` folder as root directory
   - Build Command: `npm install`
   - Start Command: `npm start`

2. **Environment Variables**
   Add these in Render dashboard:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secure_random_string
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-url.onrender.com
   PORT=5000
   ```

3. **MongoDB Setup**
   - Use MongoDB Atlas (free tier available)
   - Get connection string from Atlas dashboard
   - Whitelist Render's IP addresses (or use 0.0.0.0/0 for all IPs)

## Frontend Deployment

1. **Create a new Static Site on Render**
   - Connect your GitHub repository
   - Select the `frontend` folder as root directory
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`

2. **Environment Variables**
   Add in Render dashboard:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

## Post-Deployment Steps

1. Update CORS in backend with your frontend URL
2. Test all authentication flows
3. Verify API endpoints are accessible
4. Check MongoDB connection

## Local Development

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your values
npm run dev
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your backend URL
npm run dev
```

## Important Notes

- Free tier on Render may spin down after inactivity
- First request after inactivity may take 30-60 seconds
- MongoDB Atlas free tier has 512MB storage limit
- Keep your JWT_SECRET secure and random
