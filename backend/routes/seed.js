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
      { name: 'Dizziness', category: 'neurological', severity: 'moderate', commonCauses: [{ condition: 'Vertigo', probability: 40 }, { condition: 'Low Blood Pressure', probability: 30 }], associatedSymptoms: ['nausea', 'balance problems'], redFlags: ['loss of consciousness', 'severe headache'], description: 'Feeling lightheaded or unsteady' },
      { name: 'Sore Throat', category: 'respiratory', severity: 'mild', commonCauses: [{ condition: 'Viral Pharyngitis', probability: 60 }, { condition: 'Strep Throat', probability: 25 }], associatedSymptoms: ['difficulty swallowing', 'fever'], redFlags: ['difficulty breathing', 'drooling'], description: 'Pain or irritation in throat' },
      { name: 'Abdominal Pain', category: 'digestive', severity: 'moderate', commonCauses: [{ condition: 'Gastritis', probability: 40 }, { condition: 'Appendicitis', probability: 20 }], associatedSymptoms: ['nausea', 'bloating'], redFlags: ['severe pain', 'blood in stool'], description: 'Pain in stomach area' },
      { name: 'Joint Pain', category: 'musculoskeletal', severity: 'moderate', commonCauses: [{ condition: 'Arthritis', probability: 50 }, { condition: 'Injury', probability: 30 }], associatedSymptoms: ['swelling', 'stiffness'], redFlags: ['severe swelling', 'inability to move joint'], description: 'Pain in joints' },
      { name: 'Vomiting', category: 'digestive', severity: 'moderate', commonCauses: [{ condition: 'Gastroenteritis', probability: 50 }, { condition: 'Food Poisoning', probability: 30 }], associatedSymptoms: ['nausea', 'diarrhea'], redFlags: ['blood in vomit', 'severe dehydration'], description: 'Forceful expulsion of stomach contents' },
      { name: 'Diarrhea', category: 'digestive', severity: 'mild', commonCauses: [{ condition: 'Viral Infection', probability: 60 }, { condition: 'Food Intolerance', probability: 25 }], associatedSymptoms: ['abdominal cramps', 'nausea'], redFlags: ['blood in stool', 'severe dehydration'], description: 'Loose or watery stools' },
      { name: 'Constipation', category: 'digestive', severity: 'mild', commonCauses: [{ condition: 'Low Fiber Diet', probability: 50 }, { condition: 'IBS', probability: 30 }], associatedSymptoms: ['bloating', 'abdominal pain'], redFlags: ['severe pain', 'blood in stool'], description: 'Difficulty passing stools' },
      { name: 'Insomnia', category: 'neurological', severity: 'mild', commonCauses: [{ condition: 'Stress', probability: 60 }, { condition: 'Anxiety', probability: 30 }], associatedSymptoms: ['fatigue', 'irritability'], redFlags: ['severe depression', 'suicidal thoughts'], description: 'Difficulty falling or staying asleep' },
      { name: 'Anxiety', category: 'neurological', severity: 'moderate', commonCauses: [{ condition: 'Generalized Anxiety Disorder', probability: 50 }, { condition: 'Panic Disorder', probability: 30 }], associatedSymptoms: ['rapid heartbeat', 'sweating'], redFlags: ['chest pain', 'thoughts of self-harm'], description: 'Excessive worry or fear' },
      { name: 'Depression', category: 'neurological', severity: 'moderate', commonCauses: [{ condition: 'Major Depressive Disorder', probability: 60 }, { condition: 'Situational Depression', probability: 30 }], associatedSymptoms: ['fatigue', 'loss of interest'], redFlags: ['suicidal thoughts', 'self-harm'], description: 'Persistent sadness or loss of interest' },
      { name: 'Muscle Pain', category: 'musculoskeletal', severity: 'mild', commonCauses: [{ condition: 'Overexertion', probability: 60 }, { condition: 'Fibromyalgia', probability: 20 }], associatedSymptoms: ['stiffness', 'weakness'], redFlags: ['severe pain', 'muscle wasting'], description: 'Pain in muscles' },
      { name: 'Neck Pain', category: 'musculoskeletal', severity: 'mild', commonCauses: [{ condition: 'Muscle Strain', probability: 60 }, { condition: 'Cervical Spondylosis', probability: 25 }], associatedSymptoms: ['stiffness', 'headache'], redFlags: ['numbness in arms', 'severe pain'], description: 'Pain in neck area' },
      { name: 'Ear Pain', category: 'general', severity: 'mild', commonCauses: [{ condition: 'Ear Infection', probability: 60 }, { condition: 'Earwax Buildup', probability: 25 }], associatedSymptoms: ['hearing loss', 'discharge'], redFlags: ['severe pain', 'facial paralysis'], description: 'Pain in or around ear' },
      { name: 'Eye Pain', category: 'general', severity: 'moderate', commonCauses: [{ condition: 'Eye Strain', probability: 50 }, { condition: 'Conjunctivitis', probability: 30 }], associatedSymptoms: ['redness', 'blurred vision'], redFlags: ['sudden vision loss', 'severe pain'], description: 'Pain in or around eyes' },
      { name: 'Toothache', category: 'general', severity: 'moderate', commonCauses: [{ condition: 'Dental Cavity', probability: 60 }, { condition: 'Gum Disease', probability: 25 }], associatedSymptoms: ['swelling', 'sensitivity'], redFlags: ['fever', 'facial swelling'], description: 'Pain in teeth or gums' },
      { name: 'Runny Nose', category: 'respiratory', severity: 'mild', commonCauses: [{ condition: 'Common Cold', probability: 60 }, { condition: 'Allergies', probability: 30 }], associatedSymptoms: ['sneezing', 'congestion'], redFlags: ['high fever', 'severe headache'], description: 'Nasal discharge' },
      { name: 'Sneezing', category: 'respiratory', severity: 'mild', commonCauses: [{ condition: 'Allergies', probability: 50 }, { condition: 'Common Cold', probability: 40 }], associatedSymptoms: ['runny nose', 'itchy eyes'], redFlags: ['difficulty breathing', 'severe allergic reaction'], description: 'Involuntary expulsion of air from nose' },
      { name: 'Wheezing', category: 'respiratory', severity: 'moderate', commonCauses: [{ condition: 'Asthma', probability: 60 }, { condition: 'Bronchitis', probability: 25 }], associatedSymptoms: ['shortness of breath', 'cough'], redFlags: ['severe difficulty breathing', 'blue lips'], description: 'Whistling sound when breathing' },
      { name: 'Palpitations', category: 'cardiovascular', severity: 'moderate', commonCauses: [{ condition: 'Anxiety', probability: 50 }, { condition: 'Arrhythmia', probability: 30 }], associatedSymptoms: ['dizziness', 'shortness of breath'], redFlags: ['chest pain', 'fainting'], description: 'Awareness of heartbeat' },
      { name: 'Swelling', category: 'general', severity: 'mild', commonCauses: [{ condition: 'Fluid Retention', probability: 50 }, { condition: 'Injury', probability: 30 }], associatedSymptoms: ['pain', 'redness'], redFlags: ['sudden severe swelling', 'difficulty breathing'], description: 'Enlargement of body part' },
      { name: 'Weight Loss', category: 'general', severity: 'moderate', commonCauses: [{ condition: 'Hyperthyroidism', probability: 40 }, { condition: 'Diabetes', probability: 30 }], associatedSymptoms: ['fatigue', 'appetite changes'], redFlags: ['rapid weight loss', 'severe weakness'], description: 'Unintentional loss of body weight' },
      { name: 'Weight Gain', category: 'general', severity: 'mild', commonCauses: [{ condition: 'Hypothyroidism', probability: 40 }, { condition: 'Overeating', probability: 50 }], associatedSymptoms: ['fatigue', 'mood changes'], redFlags: ['rapid weight gain', 'swelling'], description: 'Unintentional increase in body weight' },
      { name: 'Blurred Vision', category: 'general', severity: 'moderate', commonCauses: [{ condition: 'Refractive Error', probability: 50 }, { condition: 'Diabetes', probability: 30 }], associatedSymptoms: ['eye strain', 'headache'], redFlags: ['sudden vision loss', 'double vision'], description: 'Loss of visual clarity' },
      { name: 'Numbness', category: 'neurological', severity: 'moderate', commonCauses: [{ condition: 'Nerve Compression', probability: 50 }, { condition: 'Diabetes', probability: 30 }], associatedSymptoms: ['tingling', 'weakness'], redFlags: ['sudden numbness', 'loss of function'], description: 'Loss of sensation' },
      { name: 'Tingling', category: 'neurological', severity: 'mild', commonCauses: [{ condition: 'Nerve Irritation', probability: 50 }, { condition: 'Poor Circulation', probability: 30 }], associatedSymptoms: ['numbness', 'pain'], redFlags: ['severe pain', 'loss of function'], description: 'Pins and needles sensation' },
      { name: 'Tremor', category: 'neurological', severity: 'moderate', commonCauses: [{ condition: 'Essential Tremor', probability: 50 }, { condition: 'Parkinsons Disease', probability: 30 }], associatedSymptoms: ['stiffness', 'balance problems'], redFlags: ['sudden onset', 'severe tremor'], description: 'Involuntary shaking' },
      { name: 'Confusion', category: 'neurological', severity: 'severe', commonCauses: [{ condition: 'Delirium', probability: 40 }, { condition: 'Dementia', probability: 30 }], associatedSymptoms: ['memory loss', 'disorientation'], redFlags: ['sudden confusion', 'loss of consciousness'], description: 'Difficulty thinking clearly' },
      { name: 'Memory Loss', category: 'neurological', severity: 'moderate', commonCauses: [{ condition: 'Alzheimers Disease', probability: 40 }, { condition: 'Stress', probability: 30 }], associatedSymptoms: ['confusion', 'difficulty concentrating'], redFlags: ['sudden memory loss', 'severe confusion'], description: 'Inability to recall information' },
      { name: 'Seizures', category: 'neurological', severity: 'severe', commonCauses: [{ condition: 'Epilepsy', probability: 60 }, { condition: 'Brain Injury', probability: 20 }], associatedSymptoms: ['loss of consciousness', 'muscle spasms'], redFlags: ['prolonged seizure', 'multiple seizures'], description: 'Sudden uncontrolled electrical activity in brain' },
      { name: 'Fainting', category: 'neurological', severity: 'moderate', commonCauses: [{ condition: 'Low Blood Pressure', probability: 50 }, { condition: 'Dehydration', probability: 30 }], associatedSymptoms: ['dizziness', 'weakness'], redFlags: ['chest pain', 'irregular heartbeat'], description: 'Temporary loss of consciousness' },
      { name: 'Bruising', category: 'dermatological', severity: 'mild', commonCauses: [{ condition: 'Injury', probability: 70 }, { condition: 'Blood Disorder', probability: 15 }], associatedSymptoms: ['pain', 'swelling'], redFlags: ['unexplained bruising', 'excessive bleeding'], description: 'Discoloration of skin from injury' },
      { name: 'Itching', category: 'dermatological', severity: 'mild', commonCauses: [{ condition: 'Dry Skin', probability: 50 }, { condition: 'Allergic Reaction', probability: 30 }], associatedSymptoms: ['rash', 'redness'], redFlags: ['severe itching', 'difficulty breathing'], description: 'Uncomfortable skin sensation' },
      { name: 'Hair Loss', category: 'dermatological', severity: 'mild', commonCauses: [{ condition: 'Alopecia', probability: 40 }, { condition: 'Stress', probability: 30 }], associatedSymptoms: ['scalp irritation', 'thinning hair'], redFlags: ['sudden hair loss', 'patches of baldness'], description: 'Loss of hair from scalp or body' },
      { name: 'Night Sweats', category: 'general', severity: 'mild', commonCauses: [{ condition: 'Menopause', probability: 40 }, { condition: 'Infection', probability: 30 }], associatedSymptoms: ['fever', 'chills'], redFlags: ['unexplained weight loss', 'persistent fever'], description: 'Excessive sweating during sleep' },
      { name: 'Frequent Urination', category: 'general', severity: 'mild', commonCauses: [{ condition: 'Diabetes', probability: 40 }, { condition: 'UTI', probability: 35 }], associatedSymptoms: ['thirst', 'urgency'], redFlags: ['blood in urine', 'severe pain'], description: 'Need to urinate often' },
      { name: 'Painful Urination', category: 'general', severity: 'moderate', commonCauses: [{ condition: 'UTI', probability: 60 }, { condition: 'Kidney Stones', probability: 25 }], associatedSymptoms: ['frequent urination', 'urgency'], redFlags: ['blood in urine', 'fever'], description: 'Pain or burning during urination' },
      { name: 'Blood in Urine', category: 'general', severity: 'severe', commonCauses: [{ condition: 'UTI', probability: 40 }, { condition: 'Kidney Stones', probability: 30 }], associatedSymptoms: ['pain', 'frequent urination'], redFlags: ['severe pain', 'inability to urinate'], description: 'Presence of blood in urine' },
      { name: 'Difficulty Swallowing', category: 'digestive', severity: 'moderate', commonCauses: [{ condition: 'GERD', probability: 40 }, { condition: 'Esophagitis', probability: 30 }], associatedSymptoms: ['chest pain', 'heartburn'], redFlags: ['complete inability to swallow', 'weight loss'], description: 'Trouble swallowing food or liquids' },
      { name: 'Heartburn', category: 'digestive', severity: 'mild', commonCauses: [{ condition: 'GERD', probability: 60 }, { condition: 'Hiatal Hernia', probability: 25 }], associatedSymptoms: ['chest pain', 'sour taste'], redFlags: ['severe chest pain', 'difficulty breathing'], description: 'Burning sensation in chest' },
      { name: 'Bloating', category: 'digestive', severity: 'mild', commonCauses: [{ condition: 'IBS', probability: 40 }, { condition: 'Food Intolerance', probability: 35 }], associatedSymptoms: ['abdominal pain', 'gas'], redFlags: ['severe pain', 'vomiting'], description: 'Feeling of fullness or swelling in abdomen' }
    ]

    await Symptom.insertMany(symptoms)
    res.json({ message: 'Symptoms seeded successfully', count: symptoms.length })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
