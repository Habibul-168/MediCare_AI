const express = require('express')
const router = express.Router()

// Emergency hospitals data
const emergencyHospitals = [
  {
    id: 1,
    name: 'City General Hospital',
    address: '123 Main St, Downtown',
    phone: '+1-555-0911',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    emergencyServices: true,
    traumaCenter: true,
    rating: 4.5
  },
  {
    id: 2,
    name: 'St. Mary Medical Center',
    address: '456 Oak Ave, Midtown',
    phone: '+1-555-0912',
    coordinates: { lat: 40.7589, lng: -73.9851 },
    emergencyServices: true,
    traumaCenter: false,
    rating: 4.3
  },
  {
    id: 3,
    name: 'Regional Trauma Center',
    address: '789 Pine St, Uptown',
    phone: '+1-555-0913',
    coordinates: { lat: 40.7831, lng: -73.9712 },
    emergencyServices: true,
    traumaCenter: true,
    rating: 4.8
  }
]

// Get nearby hospitals
router.get('/hospitals', (req, res) => {
  try {
    const { lat, lng, radius = 10 } = req.query
    
    // Simulate distance calculation
    const hospitalsWithDistance = emergencyHospitals.map(hospital => ({
      ...hospital,
      distance: `${(Math.random() * 8 + 1).toFixed(1)} km`,
      eta: `${Math.floor(Math.random() * 15 + 5)} mins`,
      availableBeds: Math.floor(Math.random() * 20 + 5),
      waitTime: `${Math.floor(Math.random() * 30 + 10)} mins`
    }))

    res.json(hospitalsWithDistance.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance)))
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Request ambulance
router.post('/ambulance', (req, res) => {
  try {
    const { location, emergencyType, patientInfo, contactNumber } = req.body

    if (!location || !emergencyType || !contactNumber) {
      return res.status(400).json({ error: 'Missing required information' })
    }

    // Simulate ambulance dispatch
    const ambulanceRequest = {
      requestId: `AMB${Date.now()}`,
      location,
      emergencyType,
      patientInfo,
      contactNumber,
      status: 'dispatched',
      eta: `${Math.floor(Math.random() * 10 + 5)} minutes`,
      ambulanceUnit: `AMB-${Math.floor(Math.random() * 100 + 1)}`,
      driverName: 'Emergency Response Team',
      driverPhone: '+1-555-AMBULANCE',
      timestamp: new Date(),
      priority: emergencyType.includes('Critical') ? 'high' : 'medium'
    }

    res.json({
      message: 'Ambulance dispatched successfully',
      request: ambulanceRequest
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Emergency contacts
router.get('/contacts', (req, res) => {
  try {
    const emergencyContacts = {
      emergency: '911',
      poison: '1-800-222-1222',
      suicide: '988',
      domestic: '1-800-799-7233',
      medical: '+1-555-MEDICARE',
      mental: '+1-555-MENTAL'
    }

    res.json(emergencyContacts)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Emergency tips
router.get('/tips/:type', (req, res) => {
  try {
    const { type } = req.params
    
    const emergencyTips = {
      'heart-attack': [
        'Call 911 immediately',
        'Chew aspirin if not allergic',
        'Stay calm and sit down',
        'Loosen tight clothing',
        'Do not drive yourself'
      ],
      'stroke': [
        'Call 911 immediately',
        'Note the time symptoms started',
        'Keep the person calm',
        'Do not give food or water',
        'Check for FAST signs'
      ],
      'choking': [
        'Encourage coughing',
        'Give back blows',
        'Perform Heimlich maneuver',
        'Call 911 if unsuccessful',
        'Continue until help arrives'
      ],
      'burns': [
        'Cool with running water',
        'Remove from heat source',
        'Do not use ice',
        'Cover with clean cloth',
        'Seek medical attention'
      ],
      'bleeding': [
        'Apply direct pressure',
        'Elevate the wound',
        'Use clean cloth',
        'Do not remove embedded objects',
        'Call 911 for severe bleeding'
      ]
    }

    const tips = emergencyTips[type] || [
      'Stay calm',
      'Call 911 if serious',
      'Follow dispatcher instructions',
      'Provide clear location',
      'Stay with the patient'
    ]

    res.json({ type, tips })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router