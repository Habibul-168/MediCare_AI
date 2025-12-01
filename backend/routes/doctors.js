const express = require('express')
const router = express.Router()
const Doctor = require('../models/Doctor')

// Get all doctors with filtering
router.get('/', async (req, res) => {
  try {
    const { specialty, location, available } = req.query
    let filter = {}

    if (specialty) filter.specialty = specialty
    if (available === 'true') filter.isAvailable = true
    if (location) filter['location.city'] = location

    const doctors = await Doctor.find(filter).sort({ rating: -1 })
    res.json(doctors)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get doctor by ID
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' })
    }
    res.json(doctor)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Search doctors by location and specialty
router.post('/search', async (req, res) => {
  try {
    const { location, specialty, radius = 10 } = req.body
    
    let filter = {}
    if (specialty && specialty !== 'All Specialties') {
      filter.specialty = specialty
    }
    
    if (location) {
      filter['location.city'] = new RegExp(location, 'i')
    }

    const doctors = await Doctor.find(filter)
      .sort({ rating: -1, isAvailable: -1 })
      .limit(20)

    // Simulate distance calculation
    const doctorsWithDistance = doctors.map(doctor => ({
      ...doctor.toObject(),
      distance: `${(Math.random() * 10 + 1).toFixed(1)} km`,
      eta: `${Math.floor(Math.random() * 20 + 5)} mins`
    }))

    res.json(doctorsWithDistance)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Book appointment
router.post('/:id/book', async (req, res) => {
  try {
    const { patientName, phone, date, time, symptoms } = req.body
    const doctor = await Doctor.findById(req.params.id)
    
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' })
    }

    if (!doctor.isAvailable) {
      return res.status(400).json({ error: 'Doctor is not available' })
    }

    // Simulate booking (in real app, you'd create an Appointment model)
    const booking = {
      doctorId: doctor._id,
      doctorName: doctor.name,
      patientName,
      phone,
      date,
      time,
      symptoms,
      status: 'confirmed',
      bookingId: `BK${Date.now()}`,
      consultationFee: doctor.consultationFee
    }

    res.json({
      message: 'Appointment booked successfully',
      booking
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router