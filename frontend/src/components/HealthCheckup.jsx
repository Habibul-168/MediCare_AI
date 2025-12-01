import { useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, Calendar, User, Phone, Mail, MapPin, CheckCircle } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../config'

const HealthCheckup = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    checkupType: '',
    preferredDate: '',
    location: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [locationSuggestions, setLocationSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const locations = [
    'Mumbai, Maharashtra', 'Delhi, Delhi', 'Bangalore, Karnataka', 'Hyderabad, Telangana', 'Ahmedabad, Gujarat',
    'Chennai, Tamil Nadu', 'Kolkata, West Bengal', 'Pune, Maharashtra', 'Jaipur, Rajasthan', 'Surat, Gujarat',
    'Lucknow, Uttar Pradesh', 'Kanpur, Uttar Pradesh', 'Nagpur, Maharashtra', 'Indore, Madhya Pradesh', 'Thane, Maharashtra',
    'Bhopal, Madhya Pradesh', 'Visakhapatnam, Andhra Pradesh', 'Patna, Bihar', 'Vadodara, Gujarat', 'Ghaziabad, Uttar Pradesh',
    'Ludhiana, Punjab', 'Agra, Uttar Pradesh', 'Nashik, Maharashtra', 'Faridabad, Haryana', 'Meerut, Uttar Pradesh',
    'Rajkot, Gujarat', 'Varanasi, Uttar Pradesh', 'Srinagar, Jammu and Kashmir', 'Aurangabad, Maharashtra', 'Amritsar, Punjab',
    'Navi Mumbai, Maharashtra', 'Allahabad, Uttar Pradesh', 'Ranchi, Jharkhand', 'Coimbatore, Tamil Nadu', 'Chandigarh, Chandigarh',
    'Guwahati, Assam', 'Kota, Rajasthan', 'Madurai, Tamil Nadu', 'Raipur, Chhattisgarh', 'Jodhpur, Rajasthan'
  ]

  const handleLocationChange = (value) => {
    setFormData({ ...formData, location: value })
    if (value.length > 0) {
      const filtered = locations.filter(loc => 
        loc.toLowerCase().includes(value.toLowerCase())
      )
      setLocationSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }

  const selectLocation = (location) => {
    setFormData({ ...formData, location })
    setShowSuggestions(false)
  }

  const checkupTypes = [
    { value: 'kidney', label: 'Kidney Function Test' },
    { value: 'blood-sugar', label: 'Blood Sugar Test (Diabetes)' },
    { value: 'heart', label: 'Heart Health Checkup' },
    { value: 'liver', label: 'Liver Function Test' },
    { value: 'thyroid', label: 'Thyroid Test' },
    { value: 'bone-density', label: 'Bone Density Test' },
    { value: 'cholesterol', label: 'Cholesterol & Lipid Profile' },
    { value: 'vitamin', label: 'Vitamin Deficiency Test' },
    { value: 'cancer-screening', label: 'Cancer Screening' },
    { value: 'eye-checkup', label: 'Eye Checkup' },
    { value: 'dental', label: 'Dental Checkup' },
    { value: 'blood-pressure', label: 'Blood Pressure Monitoring' },
    { value: 'respiratory', label: 'Respiratory Function Test' },
    { value: 'digestive', label: 'Digestive System Checkup' },
    { value: 'full-body', label: 'Full Body Checkup' }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    try {
      const booking = {
        id: Date.now(),
        ...formData,
        status: 'Confirmed',
        bookedAt: new Date().toISOString()
      }
      const bookings = JSON.parse(localStorage.getItem('healthCheckups') || '[]')
      bookings.push(booking)
      localStorage.setItem('healthCheckups', JSON.stringify(bookings))
      await axios.post(`${API_URL}/api/checkups/book`, formData)
      navigate('/health-checkup-bookings')
    } catch (error) {
      console.error('Error booking checkup:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Activity className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Book Health Checkup</h1>
          <p className="text-xl text-gray-600">Schedule your preventive health screening today</p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-green-50 border-2 border-green-500 rounded-2xl p-8 text-center"
          >
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-900 mb-2">Booking Confirmed!</h2>
            <p className="text-green-700">We'll contact you shortly to confirm your appointment.</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-gray-700 font-semibold mb-2">
                  <User className="h-5 w-5 mr-2" />
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="First name"
                />
              </div>

              <div>
                <label className="flex items-center text-gray-700 font-semibold mb-2">
                  <User className="h-5 w-5 mr-2" />
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Last name"
                />
              </div>

              <div>
                <label className="flex items-center text-gray-700 font-semibold mb-2">
                  <Mail className="h-5 w-5 mr-2" />
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="flex items-center text-gray-700 font-semibold mb-2">
                  <Phone className="h-5 w-5 mr-2" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(123) 456-7890"
                />
              </div>

              <div>
                <label className="flex items-center text-gray-700 font-semibold mb-2">
                  <Activity className="h-5 w-5 mr-2" />
                  Checkup Type *
                </label>
                <select
                  required
                  value={formData.checkupType}
                  onChange={(e) => setFormData({ ...formData, checkupType: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select checkup type</option>
                  {checkupTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center text-gray-700 font-semibold mb-2">
                  <Calendar className="h-5 w-5 mr-2" />
                  Preferred Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <label className="flex items-center text-gray-700 font-semibold mb-2">
                  <MapPin className="h-5 w-5 mr-2" />
                  Location *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  onFocus={() => formData.location && setShowSuggestions(true)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="City, State"
                  autoComplete="off"
                />
                {showSuggestions && locationSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {locationSuggestions.map((loc, idx) => (
                      <div
                        key={idx}
                        onClick={() => selectLocation(loc)}
                        className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-700"
                      >
                        {loc}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Book Checkup
            </button>
          </motion.form>
        )}
      </div>
    </div>
  )
}

export default HealthCheckup
