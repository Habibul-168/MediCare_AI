const mongoose = require('mongoose')
const Doctor = require('../models/Doctor')
const Symptom = require('../models/Symptom')
require('dotenv').config()

const indianCities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow']
const specialties = ['General Physician', 'Cardiologist', 'Dermatologist', 'Neurologist', 'Pediatrician', 'Orthopedic', 'Gynecologist', 'ENT Specialist', 'Psychiatrist', 'Ophthalmologist']

const doctors = []
const coordinates = {
  'Mumbai': { lat: 19.0760, lng: 72.8777 },
  'Delhi': { lat: 28.7041, lng: 77.1025 },
  'Bangalore': { lat: 12.9716, lng: 77.5946 },
  'Hyderabad': { lat: 17.3850, lng: 78.4867 },
  'Chennai': { lat: 13.0827, lng: 80.2707 },
  'Kolkata': { lat: 22.5726, lng: 88.3639 },
  'Pune': { lat: 18.5204, lng: 73.8567 },
  'Ahmedabad': { lat: 23.0225, lng: 72.5714 },
  'Jaipur': { lat: 26.9124, lng: 75.7873 },
  'Lucknow': { lat: 26.8467, lng: 80.9462 }
}

const doctorNames = [
  'Anil Sharma', 'Priya Singh', 'Mohammed Ali', 'Sunita Devi', 'Sanjay Gupta',
  'Aisha Khan', 'Rajiv Kapoor', 'Fatima Begum', 'Harish Chandra', 'Rizwan Ahmed',
  'Rahul Sharma', 'Anita Verma', 'Sanjay Gupta', 'Priya Patel', 'Vikram Singh',
  'Aparna Banerjee', 'Samim Ahmad'
]

specialties.forEach((specialty, specIdx) => {
  indianCities.forEach((city, idx) => {
    const nameIdx1 = (specIdx * 10 + idx * 2) % doctorNames.length
    const nameIdx2 = (specIdx * 10 + idx * 2 + 1) % doctorNames.length
    
    doctors.push({
      name: `Dr. ${doctorNames[nameIdx1]}`,
      specialty,
      qualifications: ['MBBS', `MD ${specialty}`],
      experience: 8 + (idx % 15),
      rating: 4.5 + (idx % 5) * 0.1,
      reviewCount: 50 + idx * 10,
      location: {
        address: `${idx + 1} Medical Plaza`,
        city,
        state: city,
        zipCode: `${400000 + idx}`,
        coordinates: coordinates[city]
      },
      contact: {
        phone: `+91-${9000000000 + idx * 1000}`,
        email: `dr.${doctorNames[nameIdx1].toLowerCase().replace(/\s+/g, '.')}@hospital.com`
      },
      availability: {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        hours: { start: '09:00', end: '17:00' }
      },
      consultationFee: 500 + idx * 50,
      isAvailable: true,
      languages: ['English', 'Hindi'],
      hospitalAffiliation: `${city} Medical Center`
    })
    
    doctors.push({
      name: `Dr. ${doctorNames[nameIdx2]}`,
      specialty,
      qualifications: ['MBBS', `MD ${specialty}`],
      experience: 10 + (idx % 12),
      rating: 4.6 + (idx % 4) * 0.1,
      reviewCount: 60 + idx * 12,
      location: {
        address: `${idx + 50} Health Center`,
        city,
        state: city,
        zipCode: `${400000 + idx + 100}`,
        coordinates: coordinates[city]
      },
      contact: {
        phone: `+91-${9100000000 + idx * 1000}`,
        email: `dr.${doctorNames[nameIdx2].toLowerCase().replace(/\s+/g, '.')}@hospital.com`
      },
      availability: {
        days: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
        hours: { start: '10:00', end: '18:00' }
      },
      consultationFee: 600 + idx * 60,
      isAvailable: true,
      languages: ['English', 'Hindi'],
      hospitalAffiliation: `${city} Specialty Hospital`
    })
  })
})

const symptoms = [
  {
    name: 'Headache',
    category: 'neurological',
    severity: 'mild',
    commonCauses: [
      { condition: 'Tension Headache', probability: 60 },
      { condition: 'Migraine', probability: 25 }
    ],
    associatedSymptoms: ['nausea', 'light sensitivity'],
    redFlags: ['sudden severe headache', 'fever with headache'],
    description: 'Pain in the head or neck area'
  },
  {
    name: 'Fever',
    category: 'general',
    severity: 'moderate',
    commonCauses: [
      { condition: 'Viral Infection', probability: 70 },
      { condition: 'Bacterial Infection', probability: 20 }
    ],
    associatedSymptoms: ['chills', 'fatigue'],
    redFlags: ['high fever over 103°F', 'difficulty breathing'],
    description: 'Elevated body temperature'
  }
]

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/medical-ai')
    console.log('Connected to MongoDB')

    await Doctor.deleteMany({})
    await Symptom.deleteMany({})
    console.log('Cleared existing data')

    await Doctor.insertMany(doctors)
    console.log(`${doctors.length} doctors seeded successfully`)

    await Symptom.insertMany(symptoms)
    console.log('Symptoms seeded successfully')

    console.log('Database seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
