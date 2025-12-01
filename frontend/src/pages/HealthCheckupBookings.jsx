import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Activity, Calendar, MapPin, User, Mail, Phone, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HealthCheckupBookings = () => {
  const [bookings, setBookings] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('healthCheckups') || '[]')
    setBookings(saved)
  }, [])

  const cancelBooking = (id) => {
    const updated = bookings.filter(b => b.id !== id)
    setBookings(updated)
    localStorage.setItem('healthCheckups', JSON.stringify(updated))
  }

  const checkupTypes = {
    'kidney': 'Kidney Function Test',
    'blood-sugar': 'Blood Sugar Test (Diabetes)',
    'heart': 'Heart Health Checkup',
    'liver': 'Liver Function Test',
    'thyroid': 'Thyroid Test',
    'bone-density': 'Bone Density Test',
    'cholesterol': 'Cholesterol & Lipid Profile',
    'vitamin': 'Vitamin Deficiency Test',
    'cancer-screening': 'Cancer Screening',
    'eye-checkup': 'Eye Checkup',
    'dental': 'Dental Checkup',
    'blood-pressure': 'Blood Pressure Monitoring',
    'respiratory': 'Respiratory Function Test',
    'digestive': 'Digestive System Checkup',
    'full-body': 'Full Body Checkup'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">My Health Checkup Bookings</h1>
            <button
              onClick={() => navigate('/health-checkup')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Book New Checkup
            </button>
          </div>

          {bookings.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <Activity className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No health checkup bookings</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-3">
                        <Activity className="h-6 w-6 text-blue-600" />
                        <h3 className="text-xl font-bold text-gray-900">
                          {checkupTypes[booking.checkupType] || booking.checkupType}
                        </h3>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-700">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span>{booking.firstName} {booking.lastName}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <span>{booking.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span>{booking.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>{booking.preferredDate}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>{booking.location}</span>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          {booking.status}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => cancelBooking(booking.id)}
                      className="text-red-600 hover:text-red-700 p-2"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default HealthCheckupBookings
