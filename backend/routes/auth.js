const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body
    const user = new User({ name, email, password, phone })
    await user.save()
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '7d' })
    res.status(201).json({ token, user: { id: user._id, name, email } })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '7d' })
    res.json({ token, user: { id: user._id, name: user.name, email } })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router
