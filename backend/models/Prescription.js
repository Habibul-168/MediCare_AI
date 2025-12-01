const mongoose = require('mongoose')

const prescriptionSchema = new mongoose.Schema({
  patientName: String,
  patientAge: String,
  patientSymptoms: [String],
  diagnosis: {
    condition: String,
    confidence: Number,
    severity: String,
    description: String
  },
  medications: [{
    name: String,
    dosage: String,
    frequency: String,
    duration: String,
    instructions: String,
    sideEffects: [String]
  }],
  recommendations: [String],
  precautions: [String],
  followUpRequired: Boolean,
  emergencyWarnings: [String],
  generatedBy: {
    type: String,
    default: 'AI System'
  },
  isAIGenerated: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Prescription', prescriptionSchema)