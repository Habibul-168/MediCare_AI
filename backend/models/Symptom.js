const mongoose = require('mongoose')

const symptomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['respiratory', 'cardiovascular', 'neurological', 'digestive', 'musculoskeletal', 'dermatological', 'general']
  },
  severity: {
    type: String,
    enum: ['mild', 'moderate', 'severe', 'critical'],
    default: 'mild'
  },
  commonCauses: [{
    condition: String,
    probability: Number
  }],
  associatedSymptoms: [String],
  redFlags: [String],
  description: String
}, {
  timestamps: true
})

module.exports = mongoose.model('Symptom', symptomSchema)