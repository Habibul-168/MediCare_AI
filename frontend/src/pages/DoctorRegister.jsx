import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Stethoscope, User, Mail, Phone, MapPin, Award, Clock, DollarSign } from 'lucide-react'
import axios from 'axios'
import { API_URL } from '../config'

const DoctorRegister = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialty: '',
    qualifications: '',
    experience: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    consultationFee: '',
    languages: '',
    hospitalAffiliation: '',
    availableDays: [],
    startTime: '09:00',
    endTime: '17:00'
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const specialties = [
    'General Physician', 'Cardiologist', 'Dermatologist', 'Neurologist',
    'Orthopedic', 'Pediatrician', 'Psychiatrist', 'Gynecologist', 'ENT Specialist', 'Ophthalmologist'
  ]

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const handleDayToggle = (day) => {
    setFormData(prev => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter(d => d !== day)
        : [...prev.availableDays, day]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const doctorData = {
        name: formData.name,
        specialty: formData.specialty,
        qualifications: formData.qualifications.split(',').map(q => q.trim()),
        experience: parseInt(formData.experience),
        rating: 4.0,
        reviewCount: 0,
        location: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          coordinates: { lat: 0, lng: 0 }
        },
        contact: {
          phone: formData.phone,
          email: formData.email
        },
        availability: {
          days: formData.availableDays,
          hours: {
            start: formData.startTime,
            end: formData.endTime
          }
        },
        consultationFee: parseInt(formData.consultationFee),
        isAvailable: true,
        languages: formData.languages.split(',').map(l => l.trim()),
        hospitalAffiliation: formData.hospitalAffiliation
      }

      await axios.post(`${API_URL}/api/doctors/register`, doctorData)
      setSuccess(true)
      setTimeout(() => navigate('/doctors'), 2000)
    } catch (error) {
      alert(error.response?.data?.error || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Stethoscope className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-green-900 mb-2">Registration Successful!</h2>
          <p className="text-gray-600">Redirecting to doctors page...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Stethoscope className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Doctor Registration</h1>
          <p className="text-gray-600">Join our network of healthcare professionals</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <User className="h-5 w-5 mr-2 text-blue-600" />
            Personal Information
          </h3>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="input-field"
                placeholder="Dr. John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="input-field"
                placeholder="doctor@example.com"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="input-field"
                placeholder="+91-9876543210"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specialty *</label>
              <select
                required
                value={formData.specialty}
                onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                className="input-field"
              >
                <option value="">Select Specialty</option>
                {specialties.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Qualifications *</label>
              <input
                type="text"
                required
                value={formData.qualifications}
                onChange={(e) => setFormData({...formData, qualifications: e.target.value})}
                className="input-field"
                placeholder="MBBS, MD (comma separated)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Experience (years) *</label>
              <input
                type="number"
                required
                min="0"
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
                className="input-field"
                placeholder="10"
              />
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-6 mt-8 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-blue-600" />
            Location Details
          </h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="input-field"
              placeholder="Clinic/Hospital Address"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                className="input-field"
                placeholder="Mumbai"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
              <input
                type="text"
                required
                value={formData.state}
                onChange={(e) => setFormData({...formData, state: e.target.value})}
                className="input-field"
                placeholder="Maharashtra"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code *</label>
              <input
                type="text"
                required
                value={formData.zipCode}
                onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                className="input-field"
                placeholder="400001"
              />
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-6 mt-8 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-blue-600" />
            Availability
          </h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Available Days *</label>
            <div className="flex flex-wrap gap-2">
              {days.map(day => (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleDayToggle(day)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    formData.availableDays.includes(day)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Time *</label>
              <input
                type="time"
                required
                value={formData.startTime}
                onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Time *</label>
              <input
                type="time"
                required
                value={formData.endTime}
                onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                className="input-field"
              />
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-6 mt-8 flex items-center">
            <Award className="h-5 w-5 mr-2 text-blue-600" />
            Additional Information
          </h3>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Fee (₹) *</label>
              <input
                type="number"
                required
                min="0"
                value={formData.consultationFee}
                onChange={(e) => setFormData({...formData, consultationFee: e.target.value})}
                className="input-field"
                placeholder="500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Languages *</label>
              <input
                type="text"
                required
                value={formData.languages}
                onChange={(e) => setFormData({...formData, languages: e.target.value})}
                className="input-field"
                placeholder="English, Hindi (comma separated)"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Hospital Affiliation *</label>
            <input
              type="text"
              required
              value={formData.hospitalAffiliation}
              onChange={(e) => setFormData({...formData, hospitalAffiliation: e.target.value})}
              className="input-field"
              placeholder="City Medical Center"
            />
          </div>

          <button
            type="submit"
            disabled={loading || formData.availableDays.length === 0}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          >
            {loading ? 'Registering...' : 'Register as Doctor'}
          </button>
        </motion.form>
      </div>
    </div>
  )
}

export default DoctorRegister
