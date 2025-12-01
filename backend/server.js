const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/symptoms', require('./routes/symptoms'))
app.use('/api/doctors', require('./routes/doctors'))
app.use('/api/emergency', require('./routes/emergency'))
app.use('/api/prescriptions', require('./routes/prescriptions'))
app.use('/api/checkups', require('./routes/checkups'))
app.use('/api/telemedicine', require('./routes/telemedicine'))
app.use('/api/medicines', require('./routes/medicines'))

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/medical-ai')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err))

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Medical AI Platform API' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})