const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()

router.get('/store', auth, (req, res) => {
  res.json({ message: 'Medicine store', userId: req.user.userId })
})

router.post('/order', auth, (req, res) => {
  res.json({ message: 'Order placed', data: req.body })
})

module.exports = router
