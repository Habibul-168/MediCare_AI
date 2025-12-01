const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  specialty: {
    type: String,
    required: true,
    enum: ['General Physician', 'Cardiologist', 'Dermatologist', 'Neurologist', 'Orthopedic', 'Pediatrician', 'Psychiatrist', 'Gynecologist', 'ENT Specialist', 'Ophthalmologist']
  },
  qualifications: [String],
  experience: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  location: {
    address: String,
    city: String,
    state: String,
    zipCode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  contact: {
    phone: String,
    email: String
  },
  availability: {
    days: [String],
    hours: {
      start: String,
      end: String
    }
  },
  consultationFee: Number,
  isAvailable: {
    type: Boolean,
    default: true
  },
  languages: [String],
  hospitalAffiliation: String
}, {
  timestamps: true
})

module.exports = mongoose.model('Doctor', doctorSchema)