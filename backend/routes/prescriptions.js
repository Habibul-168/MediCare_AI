const express = require('express')
const router = express.Router()
const Prescription = require('../models/Prescription')

// Get prescription by ID
router.get('/:id', async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
    if (!prescription) {
      return res.status(404).json({ error: 'Prescription not found' })
    }
    res.json(prescription)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get all prescriptions (for admin/doctor use)
router.get('/', async (req, res) => {
  try {
    const prescriptions = await Prescription.find()
      .sort({ createdAt: -1 })
      .limit(50)
    res.json(prescriptions)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router