const express = require('express')
const router = express.Router()
const Doctor = require('../models/Doctor')
const Symptom = require('../models/Symptom')

router.post('/doctors', async (req, res) => {
  try {
    const count = await Doctor.countDocuments()
    if (count > 0) {
      return res.json({ message: 'Database already seeded', count })
    }

    const indianCities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow']
    const specialties = ['General Physician', 'Cardiologist', 'Dermatologist', 'Neurologist', 'Pediatrician', 'Orthopedic', 'Gynecologist', 'ENT Specialist', 'Psychiatrist', 'Ophthalmologist']
    const doctorNames = ['Anil Sharma', 'Priya Singh', 'Mohammed Ali', 'Sunita Devi', 'Sanjay Gupta', 'Aisha Khan', 'Rajiv Kapoor', 'Fatima Begum', 'Harish Chandra', 'Rizwan Ahmed', 'Rahul Sharma', 'Anita Verma', 'Priya Patel', 'Vikram Singh', 'Aparna Banerjee', 'Samim Ahmad']
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

    const doctors = []
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

    await Doctor.insertMany(doctors)
    res.json({ message: 'Database seeded successfully', count: doctors.length })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/symptoms', async (req, res) => {
  try {
    const count = await Symptom.countDocuments()
    if (count > 0) {
      return res.json({ message: 'Symptoms already seeded', count })
    }

    const symptoms = [
      { name: 'Headache', category: 'neurological', severity: 'mild', commonCauses: [{ condition: 'Tension Headache', probability: 60 }, { condition: 'Migraine', probability: 25 }], associatedSymptoms: ['nausea', 'light sensitivity'], redFlags: ['sudden severe headache', 'fever with headache'], description: 'Pain in the head or neck area' },
      { name: 'Fever', category: 'general', severity: 'moderate', commonCauses: [{ condition: 'Viral Infection', probability: 70 }, { condition: 'Bacterial Infection', probability: 20 }], associatedSymptoms: ['chills', 'fatigue'], redFlags: ['high fever over 103°F', 'difficulty breathing'], description: 'Elevated body temperature' },
      { name: 'Cough', category: 'respiratory', severity: 'mild', commonCauses: [{ condition: 'Common Cold', probability: 50 }, { condition: 'Bronchitis', probability: 30 }], associatedSymptoms: ['sore throat', 'congestion'], redFlags: ['coughing blood', 'chest pain'], description: 'Forceful expulsion of air from lungs' },
      { name: 'Chest Pain', category: 'cardiovascular', severity: 'severe', commonCauses: [{ condition: 'Heart Attack', probability: 40 }, { condition: 'Angina', probability: 30 }], associatedSymptoms: ['shortness of breath', 'sweating'], redFlags: ['crushing chest pain', 'pain radiating to arm'], description: 'Pain or discomfort in chest area' },
      { name: 'Nausea', category: 'digestive', severity: 'mild', commonCauses: [{ condition: 'Food Poisoning', probability: 40 }, { condition: 'Gastritis', probability: 30 }], associatedSymptoms: ['vomiting', 'dizziness'], redFlags: ['severe dehydration', 'blood in vomit'], description: 'Feeling of wanting to vomit' },
      { name: 'Back Pain', category: 'musculoskeletal', severity: 'moderate', commonCauses: [{ condition: 'Muscle Strain', probability: 60 }, { condition: 'Herniated Disc', probability: 20 }], associatedSymptoms: ['stiffness', 'limited mobility'], redFlags: ['loss of bladder control', 'numbness in legs'], description: 'Pain in the back region' },
      { name: 'Rash', category: 'dermatological', severity: 'mild', commonCauses: [{ condition: 'Allergic Reaction', probability: 50 }, { condition: 'Eczema', probability: 30 }], associatedSymptoms: ['itching', 'redness'], redFlags: ['difficulty breathing', 'swelling of face'], description: 'Skin irritation or eruption' },
      { name: 'Fatigue', category: 'general', severity: 'mild', commonCauses: [{ condition: 'Anemia', probability: 40 }, { condition: 'Sleep Deprivation', probability: 50 }], associatedSymptoms: ['weakness', 'dizziness'], redFlags: ['unexplained weight loss', 'persistent fatigue'], description: 'Extreme tiredness or exhaustion' },
      { name: 'Shortness of Breath', category: 'respiratory', severity: 'severe', commonCauses: [{ condition: 'Asthma', probability: 40 }, { condition: 'Pneumonia', probability: 30 }], associatedSymptoms: ['wheezing', 'chest tightness'], redFlags: ['blue lips', 'severe difficulty breathing'], description: 'Difficulty breathing or catching breath' },
      { name: 'Dizziness', category: 'neurological', severity: 'moderate', commonCauses: [{ condition: 'Vertigo', probability: 40 }, { condition: 'Low Blood Pressure', probability: 30 }], associatedSymptoms: ['nausea', 'balance problems'], redFlags: ['loss of consciousness', 'severe headache'], description: 'Feeling lightheaded or unsteady' }
    ]

    await Symptom.insertMany(symptoms)
    res.json({ message: 'Symptoms seeded successfully', count: symptoms.length })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
