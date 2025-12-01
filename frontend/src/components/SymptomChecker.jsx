import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Brain, Pill, AlertTriangle, CheckCircle, Download, User } from 'lucide-react'
import axios from 'axios'
import { API_URL } from '../config'

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState('')
  const [patientName, setPatientName] = useState('')
  const [patientAge, setPatientAge] = useState('')
  const [analysis, setAnalysis] = useState(null)
  const [prescriptionId, setPrescriptionId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const commonSymptoms = [
    'Headache', 'Fever', 'Cough', 'Sore throat', 'Fatigue', 'Nausea',
    'Chest pain', 'Shortness of breath', 'Dizziness', 'Stomach pain',
    'Back pain', 'Joint pain', 'Skin rash', 'Insomnia', 'Anxiety'
  ]

  const handleSymptomClick = (symptom) => {
    setSymptoms(prev => prev ? `${prev}, ${symptom}` : symptom)
  }

  const analyzeSymptoms = async () => {
    if (!symptoms.trim() || !patientName.trim() || !patientAge.trim()) {
      setError('Please fill in all required fields (Name, Age, and Symptoms)')
      return
    }
    
    setLoading(true)
    setError(null)
    
    try {
      const response = await axios.post(`${API_URL}/api/symptoms/analyze`, {
        symptoms,
        patientName,
        patientAge
      })
      
      const { analysis: analysisData, prescription, prescriptionId: id } = response.data
      
      setAnalysis({
        condition: analysisData.condition,
        severity: analysisData.severity,
        confidence: analysisData.confidence,
        description: analysisData.description,
        alternativeDiagnoses: analysisData.alternativeDiagnoses || [],
        recommendations: prescription.recommendations || [],
        medicines: prescription.medications || [],
        precautions: prescription.precautions || [],
        diet: prescription.diet || []
      })
      
      setPrescriptionId(id)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze symptoms')
      console.error('Analysis error:', err)
    } finally {
      setLoading(false)
    }
  }

  const downloadPrescription = async () => {
    if (!prescriptionId) return
    
    try {
      const response = await axios.get(
        `${API_URL}/api/symptoms/prescription/${prescriptionId}/download`,
        { responseType: 'blob' }
      )
      
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `prescription_${prescriptionId}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Download error:', err)
      alert('Failed to download prescription')
    }
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Symptom Checker
          </h1>
          <p className="text-xl text-gray-600">
            Describe your symptoms and get AI-powered medical insights
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="card"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Brain className="h-6 w-6 text-blue-600 mr-2" />
              Describe Your Symptoms
            </h2>
            
            <div className="mb-4 grid grid-cols-2 gap-3">
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Your Name *"
                className="input-field"
                required
              />
              <input
                type="text"
                value={patientAge}
                onChange={(e) => setPatientAge(e.target.value)}
                placeholder="Age *"
                className="input-field"
                required
              />
            </div>
            
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Describe your symptoms (e.g., fever, cough, headache) *"
              className="input-field h-32 mb-4 resize-none"
              required
            />
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Common Symptoms:</h3>
              <div className="flex flex-wrap gap-2">
                {commonSymptoms.map((symptom) => (
                  <button
                    key={symptom}
                    onClick={() => handleSymptomClick(symptom)}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
                  >
                    {symptom}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={analyzeSymptoms}
              disabled={!symptoms.trim() || !patientName.trim() || !patientAge.trim() || loading}
              className="btn-primary w-full flex items-center justify-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
              ) : (
                <Search className="h-5 w-5 mr-2" />
              )}
              {loading ? 'Analyzing...' : 'Analyze Symptoms'}
            </button>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {analysis && (
              <>
                {/* Diagnosis */}
                <div className="card">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    Possible Condition
                  </h3>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-blue-900">{analysis.condition}</h4>
                    <p className="text-blue-700 mt-2">{analysis.description}</p>
                    <div className="mt-3 flex items-center">
                      <span className="text-sm text-blue-600">Confidence: {analysis.confidence}%</span>
                      <span className={`ml-4 px-2 py-1 rounded text-xs font-semibold ${
                        analysis.severity === 'Mild' ? 'bg-green-100 text-green-800' :
                        analysis.severity === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {analysis.severity}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Alternative Diagnoses */}
                {analysis.alternativeDiagnoses && analysis.alternativeDiagnoses.length > 0 && (
                  <div className="card">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Other Possibilities:</h3>
                    <div className="space-y-2">
                      {analysis.alternativeDiagnoses.map((alt, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span className="text-gray-700">{alt.condition}</span>
                          <span className="text-gray-500">{alt.confidence}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Medicines */}
                <div className="card">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Pill className="h-5 w-5 text-green-600 mr-2" />
                    Recommended Medicines
                  </h3>
                  <div className="space-y-3">
                    {analysis.medicines.map((medicine, index) => (
                      <div key={index} className="bg-green-50 p-3 rounded-lg">
                        <h4 className="font-semibold text-green-900">{medicine.name}</h4>
                        <p className="text-green-700 text-sm">Dosage: {medicine.dosage}</p>
                        <p className="text-green-600 text-sm">Frequency: {medicine.frequency}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Diet Recommendations */}
                {analysis.diet && analysis.diet.length > 0 && (
                  <div className="card">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Diet Recommendations</h3>
                    <div className="space-y-2">
                      {analysis.diet.map((item, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Precautions */}
                <div className="card">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    Precautions & Care
                  </h3>
                  <div className="space-y-2">
                    {analysis.precautions.map((precaution, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{precaution}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Download Prescription */}
                {prescriptionId && (
                  <button
                    onClick={downloadPrescription}
                    className="btn-primary w-full flex items-center justify-center"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download Prescription
                  </button>
                )}
              </>
            )}

            {!analysis && (
              <div className="card text-center py-12">
                <Brain className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Enter your symptoms to get AI-powered analysis</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default SymptomChecker