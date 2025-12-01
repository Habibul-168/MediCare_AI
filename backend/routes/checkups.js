const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/book', auth, async (req, res) => {
  try {
    const { name, email, phone, checkupType, preferredDate, location } = req.body;
    
    const booking = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      checkupType,
      preferredDate,
      location,
      status: 'pending',
      bookedAt: new Date()
    };

    res.json({
      success: true,
      message: 'Health checkup booked successfully',
      booking
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
