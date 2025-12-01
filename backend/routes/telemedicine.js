const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()

router.get('/sessions', auth, (req, res) => {
  res.json({ message: 'Telemedicine sessions', userId: req.user.userId })
})

router.post('/book', auth, (req, res) => {
  res.json({ message: 'Telemedicine session booked', data: req.body })
})

module.exports = router
