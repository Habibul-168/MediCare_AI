const express = require('express')
const router = express.Router()
const Symptom = require('../models/Symptom')
const Prescription = require('../models/Prescription')
const { analyzeSymptomsFromData } = require('../utils/csvParser')
const PDFDocument = require('pdfkit')

// Analyze symptoms
router.post('/analyze', async (req, res) => {
  try {
    const { symptoms, patientName, patientAge } = req.body
    
    if (!symptoms || symptoms.trim() === '') {
      return res.status(400).json({ error: 'Symptoms are required' })
    }

    const symptomWords = symptoms.toLowerCase().split(/[,\s]+/).filter(s => s.length > 2)
    const results = analyzeSymptomsFromData(symptomWords)

    if (!results || results.length === 0) {
      return res.status(404).json({ error: 'No matching conditions found' })
    }

    const topResult = results[0]
    const { disease, confidence, data } = topResult

    const medications = Array.isArray(data.medications) ? data.medications : []
    const precautions = Array.isArray(data.precautions) ? data.precautions : []
    const diet = Array.isArray(data.diet) ? data.diet : []

    const prescription = new Prescription({
      patientName: patientName || 'Patient',
      patientAge: patientAge || 'N/A',
      patientSymptoms: symptomWords,
      diagnosis: {
        condition: disease,
        confidence: Math.round(confidence),
        severity: confidence > 70 ? 'moderate' : 'mild',
        description: data.description || `Diagnosed with ${disease}`
      },
      medications: medications.slice(0, 5).map(med => ({
        name: med,
        dosage: 'As prescribed',
        frequency: 'As directed by physician',
        duration: '5-7 days',
        instructions: 'Follow doctor instructions'
      })),
      recommendations: diet.slice(0, 5),
      precautions: precautions,
      followUpRequired: confidence > 70,
      emergencyWarnings: confidence > 80 ? ['Consult a doctor immediately if symptoms worsen'] : []
    })

    await prescription.save()

    res.json({
      analysis: {
        condition: disease,
        confidence: Math.round(confidence),
        severity: confidence > 70 ? 'moderate' : 'mild',
        description: data.description || `Diagnosed with ${disease}`,
        alternativeDiagnoses: results.slice(1).map(r => ({
          condition: r.disease,
          confidence: Math.round(r.confidence)
        }))
      },
      prescription: {
        medications: prescription.medications,
        recommendations: prescription.recommendations,
        precautions: prescription.precautions,
        diet: diet.slice(0, 5)
      },
      prescriptionId: prescription._id
    })

  } catch (error) {
    console.error('Symptom analysis error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Download prescription as PDF
router.get('/prescription/:id/download', async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
    
    if (!prescription) {
      return res.status(404).json({ error: 'Prescription not found' })
    }

    const doc = new PDFDocument({ margin: 50 })
    
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="prescription_${prescription._id}.pdf"`)
    
    doc.pipe(res)
    
    doc.fontSize(20).fillColor('#2563eb').text('MEDICAL PRESCRIPTION', { align: 'center' })
    doc.moveDown()
    doc.fontSize(10).fillColor('#666').text(`Date: ${new Date(prescription.createdAt).toLocaleDateString()}`, { align: 'right' })
    doc.text(`ID: ${prescription._id}`, { align: 'right' })
    doc.moveDown()
    
    doc.fontSize(14).fillColor('#000').text('Patient Information', { underline: true })
    doc.fontSize(11).fillColor('#333')
    doc.text(`Name: ${prescription.patientName || 'N/A'}`)
    doc.text(`Age: ${prescription.patientAge || 'N/A'}`)
    doc.moveDown()
    
    doc.fontSize(14).fillColor('#000').text('Symptoms', { underline: true })
    doc.fontSize(11).fillColor('#333').text(prescription.patientSymptoms.join(', '))
    doc.moveDown()
    
    doc.fontSize(14).fillColor('#000').text('Diagnosis', { underline: true })
    doc.fontSize(11).fillColor('#333')
    doc.text(`Condition: ${prescription.diagnosis.condition}`)
    doc.text(`Confidence: ${prescription.diagnosis.confidence}%`)
    doc.text(`Severity: ${prescription.diagnosis.severity}`)
    doc.text(`Description: ${prescription.diagnosis.description}`, { width: 500 })
    doc.moveDown()
    
    doc.fontSize(14).fillColor('#000').text('Medications', { underline: true })
    doc.fontSize(11).fillColor('#333')
    prescription.medications.forEach((med, i) => {
      doc.text(`${i + 1}. ${med.name}`)
      doc.text(`   Dosage: ${med.dosage}`, { indent: 20 })
      doc.text(`   Frequency: ${med.frequency}`, { indent: 20 })
      doc.text(`   Duration: ${med.duration}`, { indent: 20 })
    })
    doc.moveDown()
    
    if (prescription.recommendations.length > 0) {
      doc.fontSize(14).fillColor('#000').text('Dietary Recommendations', { underline: true })
      doc.fontSize(11).fillColor('#333')
      prescription.recommendations.forEach((rec, i) => {
        doc.text(`${i + 1}. ${rec}`)
      })
      doc.moveDown()
    }
    
    doc.fontSize(14).fillColor('#000').text('Precautions', { underline: true })
    doc.fontSize(11).fillColor('#333')
    prescription.precautions.forEach((prec, i) => {
      doc.text(`${i + 1}. ${prec}`)
    })
    doc.moveDown()
    
    doc.fontSize(9).fillColor('#999')
    doc.text('DISCLAIMER: This is an AI-generated prescription for informational purposes only. Please consult a qualified healthcare professional for proper medical advice.', { align: 'center', width: 500 })
    
    doc.end()

  } catch (error) {
    console.error('Download error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get all symptoms
router.get('/', async (req, res) => {
  try {
    const symptoms = await Symptom.find()
    res.json(symptoms)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Search symptoms
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query
    if (!q || q.length < 2) {
      return res.json([])
    }
    const symptoms = await Symptom.find({
      name: { $regex: q, $options: 'i' }
    }).limit(10)
    res.json(symptoms)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router