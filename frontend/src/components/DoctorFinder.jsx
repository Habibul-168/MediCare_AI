import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Star, Phone, Clock, User, Search } from 'lucide-react'
import axios from 'axios'

const DoctorFinder = () => {
  const [location, setLocation] = useState('')
  const [specialty, setSpecialty] = useState('')
  const [doctors, setDoctors] = useState([])
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [bookingData, setBookingData] = useState({ name: '', phone: '', date: '', time: '' })
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [showCallConfirm, setShowCallConfirm] = useState(false)
  const [callDoctor, setCallDoctor] = useState(null)

  const specialties = [
    'General Physician', 'Cardiologist', 'Dermatologist', 'Neurologist',
    'Orthopedic', 'Pediatrician', 'Psychiatrist', 'Gynecologist', 'ENT Specialist', 'Ophthalmologist'
  ]

  const indianCities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow']

  useEffect(() => {
    fetchDoctors()
  }, [])

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/doctors')
      setDoctors(response.data)
    } catch (error) {
      console.error('Error fetching doctors:', error)
    }
  }

  const searchDoctors = async () => {
    try {
      let url = 'http://localhost:5000/api/doctors?'
      if (location) url += `location=${location}&`
      if (specialty) url += `specialty=${specialty}`
      
      const response = await axios.get(url)
      setDoctors(response.data)
    } catch (error) {
      console.error('Error searching doctors:', error)
    }
  }

  const openBookingModal = (doctor) => {
    setSelectedDoctor(doctor)
    setBookingData({ name: '', phone: '', date: '', time: '' })
    setBookingSuccess(false)
  }

  const closeBookingModal = () => {
    setSelectedDoctor(null)
    setBookingData({ name: '', phone: '', date: '', time: '' })
    setBookingSuccess(false)
  }

  const handleBooking = () => {
    if (!bookingData.name || !bookingData.phone || !bookingData.date || !bookingData.time) {
      alert('Please fill all fields')
      return
    }
    setBookingSuccess(true)
  }

  const initiateCall = (doctor) => {
    setCallDoctor(doctor)
    setShowCallConfirm(true)
  }

  const confirmCall = () => {
    setShowCallConfirm(false)
    setCallDoctor(null)
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Doctors Near You
          </h1>
          <p className="text-xl text-gray-600">
            Connect with qualified healthcare professionals in your area
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mb-8"
        >
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="input-field"
              >
                <option value="">All Cities</option>
                {indianCities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialty
              </label>
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="input-field"
              >
                <option value="">All Specialties</option>
                {specialties.map((spec) => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={searchDoctors}
                className="btn-primary w-full flex items-center justify-center"
              >
                <Search className="h-5 w-5 mr-2" />
                Search Doctors
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor._id}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card hover:shadow-xl transition-all duration-300"
            >
              <div className="text-center mb-4">
                <div className="text-6xl mb-3">👨‍⚕️</div>
                <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
                <p className="text-blue-600 font-medium">{doctor.specialty}</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{doctor.rating}</span>
                  </div>
                  <span className="text-sm text-gray-600">{doctor.experience} years</span>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{doctor.location.city}</span>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{doctor.hospitalAffiliation}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">
                    Consultation: ₹{doctor.consultationFee}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    doctor.isAvailable 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {doctor.isAvailable ? 'Available' : 'Busy'}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => openBookingModal(doctor)}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    doctor.isAvailable
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!doctor.isAvailable}
                >
                  <User className="h-4 w-4 inline mr-2" />
                  Book Appointment
                </button>
                
                <button 
                  onClick={() => initiateCall(doctor)}
                  className="w-full py-2 px-4 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                >
                  <Phone className="h-4 w-4 inline mr-2" />
                  Call Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {doctors.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No doctors found. Try adjusting your search criteria.</p>
          </motion.div>
        )}

        {showCallConfirm && callDoctor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
              <Phone className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Call Request</h3>
              <p className="text-gray-600 mb-4">Your call request will be sent to {callDoctor.name}'s personal assistant.</p>
              <p className="text-sm text-gray-500 mb-6">They will contact you shortly to schedule a call.</p>
              <div className="flex space-x-3">
                <button
                  onClick={confirmCall}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700"
                >
                  Confirm Call
                </button>
                <button
                  onClick={() => setShowCallConfirm(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedDoctor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              {!bookingSuccess ? (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Book Appointment</h3>
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <p className="font-semibold text-gray-900">{selectedDoctor.name}</p>
                    <p className="text-sm text-gray-600">{selectedDoctor.specialty}</p>
                    <p className="text-sm text-gray-600">Fee: ₹{selectedDoctor.consultationFee}</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        value={bookingData.name}
                        onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        placeholder="Enter your phone number"
                        value={bookingData.phone}
                        onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                      <input
                        type="date"
                        value={bookingData.date}
                        onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
                      <input
                        type="time"
                        value={bookingData.time}
                        onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                        className="input-field"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-3 mt-6">
                    <button
                      onClick={handleBooking}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700"
                    >
                      Book Appointment
                    </button>
                    <button
                      onClick={closeBookingModal}
                      className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center">
                    <div className="text-6xl mb-4">✅</div>
                    <h3 className="text-2xl font-bold text-green-600 mb-2">Appointment Booked Successfully!</h3>
                    <div className="bg-green-50 rounded-lg p-4 mb-4 text-left">
                      <p className="text-sm text-gray-700"><strong>Doctor:</strong> {selectedDoctor.name}</p>
                      <p className="text-sm text-gray-700"><strong>Patient:</strong> {bookingData.name}</p>
                      <p className="text-sm text-gray-700"><strong>Phone:</strong> {bookingData.phone}</p>
                      <p className="text-sm text-gray-700"><strong>Date:</strong> {bookingData.date}</p>
                      <p className="text-sm text-gray-700"><strong>Time:</strong> {bookingData.time}</p>
                    </div>
                    <button
                      onClick={closeBookingModal}
                      className="bg-blue-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-blue-700"
                    >
                      Close
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DoctorFinder
