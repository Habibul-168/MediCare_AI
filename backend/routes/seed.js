const express = require('express')
const router = express.Router()
const Doctor = require('../models/Doctor')

const indianCities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow']
const specialties = ['General Physician', 'Cardiologist', 'Dermatologist', 'Neurologist', 'Pediatrician', 'Orthopedic', 'Gynecologist', 'ENT Specialist', 'Psychiatrist', 'Ophthalmologist']

router.post('/doctors', async (req, res) => {
  try {
    const count = await Doctor.countDocuments()
    if (count > 0) {
      return res.json({ message: 'Database already seeded', count })
    }

    const doctors = []
    const doctorNames = ['Anil Sharma', 'Priya Singh', 'Mohammed Ali', 'Sunita Devi', 'Sanjay Gupta', 'Aisha Khan', 'Rajiv Kapoor', 'Fatima Begum']

    specialties.forEach((specialty, specIdx) => {
      indianCities.forEach((city, idx) => {
        const nameIdx = (specIdx * 10 + idx) % doctorNames.length
        doctors.push({
          name: `Dr. ${doctorNames[nameIdx]}`,
          specialty,
          qualifications: ['MBBS', `MD ${specialty}`],
          experience: 8 + (idx % 15),
          rating: 4.5 + (idx % 5) * 0.1,
          reviewCount: 50 + idx * 10,
          location: { address: `${idx + 1} Medical Plaza`, city, state: city, zipCode: `${400000 + idx}` },
          contact: { phone: `+91-${9000000000 + idx * 1000}`, email: `dr${idx}@hospital.com` },
          availability: { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], hours: { start: '09:00', end: '17:00' } },
          consultationFee: 500 + idx * 50,
          isAvailable: true,
          languages: ['English', 'Hindi'],
          hospitalAffiliation: `${city} Medical Center`
        })
      })
    })

    await Doctor.insertMany(doctors)
    res.json({ message: 'Database seeded successfully', count: doctors.length })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
