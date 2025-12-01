# Production Deployment Checklist

## Before Deployment

### Backend
- [ ] Set strong JWT_SECRET (use random string generator)
- [ ] Configure MongoDB Atlas connection string
- [ ] Set NODE_ENV=production
- [ ] Set FRONTEND_URL to your deployed frontend URL
- [ ] Remove any console.log statements (optional)
- [ ] Test all API endpoints locally

### Frontend
- [ ] Set VITE_API_URL to your deployed backend URL
- [ ] Test build locally: `npm run build`
- [ ] Check for any hardcoded localhost URLs
- [ ] Verify all environment variables are set

### Security
- [ ] JWT_SECRET is strong and unique
- [ ] MongoDB connection uses authentication
- [ ] CORS is configured with specific frontend URL
- [ ] No sensitive data in code or git history
- [ ] .env files are in .gitignore

### Database
- [ ] MongoDB Atlas cluster created
- [ ] IP whitelist configured (0.0.0.0/0 for Render)
- [ ] Database user created with proper permissions
- [ ] Connection string tested

## After Deployment

### Testing
- [ ] Test user registration
- [ ] Test user login
- [ ] Test protected routes (Telemedicine, Health Checkup, Medicine Store)
- [ ] Test public routes (Symptom Checker, Doctor Finder, Emergency)
- [ ] Test appointments booking
- [ ] Test health checkup booking
- [ ] Test medicine ordering
- [ ] Verify data persistence across sessions

### Monitoring
- [ ] Check Render logs for errors
- [ ] Monitor MongoDB Atlas metrics
- [ ] Test after cold start (free tier spins down)
- [ ] Verify CORS is working correctly

### Performance
- [ ] Frontend loads within acceptable time
- [ ] API responses are fast
- [ ] Images and assets load properly
- [ ] Mobile responsiveness works

## Common Issues

1. **CORS errors**: Check FRONTEND_URL in backend .env
2. **Authentication fails**: Verify JWT_SECRET is set
3. **Database connection fails**: Check MongoDB Atlas IP whitelist
4. **Slow first load**: Free tier cold start (30-60 seconds)
5. **API not found**: Verify VITE_API_URL in frontend

## Rollback Plan

If deployment fails:
1. Check Render logs for errors
2. Verify all environment variables
3. Test locally with production env vars
4. Redeploy previous working version if needed
