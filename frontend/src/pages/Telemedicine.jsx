import { motion } from 'framer-motion'
import { Video, Clock, Calendar, CheckCircle, X, Phone, Search } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Telemedicine = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [selectedSpecialty, setSelectedSpecialty] = useState('')
  const [showCallModal, setShowCallModal] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [scheduleData, setScheduleData] = useState({ date: '', time: '' })
  const [searchSpecialty, setSearchSpecialty] = useState('')
  const [showDoctors, setShowDoctors] = useState(false)

  const specialties = [
    'General Physician', 'Cardiologist', 'Dermatologist', 'Pediatrician', 'Neurologist',
    'Orthopedic', 'Gynecologist', 'ENT Specialist', 'Psychiatrist', 'Ophthalmologist',
    'Dentist', 'Urologist', 'Gastroenterologist', 'Endocrinologist', 'Pulmonologist'
  ]

  const filteredSpecialties = specialties.filter(s => s.toLowerCase().includes(searchSpecialty.toLowerCase()))
  
  const doctors = [
    { name: 'Dr. Anil Sharma', specialty: 'General Physician', available: 'Now', rating: 4.9, fee: 500 },
    { name: 'Dr. Priya Singh', specialty: 'Cardiologist', available: '2:00 PM', rating: 4.8, fee: 800 },
    { name: 'Dr. Mohammed Ali', specialty: 'Dermatologist', available: '4:30 PM', rating: 4.7, fee: 600 },
    { name: 'Dr. Sunita Devi', specialty: 'Pediatrician', available: 'Now', rating: 4.9, fee: 550 },
    { name: 'Dr. Sanjay Gupta', specialty: 'Neurologist', available: '3:00 PM', rating: 4.8, fee: 900 },
    { name: 'Dr. Aisha Khan', specialty: 'ENT Specialist', available: '11:00 AM', rating: 4.7, fee: 650 },
    { name: 'Dr. Rajiv Kapoor', specialty: 'Psychiatrist', available: 'Now', rating: 4.9, fee: 1000 },
    { name: 'Dr. Fatima Begum', specialty: 'Ophthalmologist', available: '1:00 PM', rating: 4.8, fee: 700 },
    { name: 'Dr. Harish Chandra', specialty: 'Gastroenterologist', available: '3:30 PM', rating: 4.6, fee: 850 }
  ]

  const filteredDoctors = selectedSpecialty ? doctors.filter(d => d.specialty === selectedSpecialty) : []

  const handleSearch = () => {
    if (selectedSpecialty) {
      setShowDoctors(true)
    }
  }

  const handleStartCall = (doctor) => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    setSelectedDoctor(doctor)
    setShowCallModal(true)
  }

  const handleSchedule = (doctor) => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    setSelectedDoctor(doctor)
    setShowScheduleModal(true)
  }

  const handleScheduleSubmit = (e) => {
    e.preventDefault()
    const appointment = {
      id: Date.now(),
      doctor: selectedDoctor,
      date: scheduleData.date,
      time: scheduleData.time,
      status: 'Scheduled'
    }
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]')
    appointments.push(appointment)
    localStorage.setItem('appointments', JSON.stringify(appointments))
    navigate('/appointments')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Telemedicine</h1>
          <p className="text-gray-600 mb-8">Connect with doctors from the comfort of your home</p>

          <div className="grid md:grid-cols-5 gap-6 mb-8">
            {[
              { icon: Video, title: 'Video Consultation', desc: 'Face-to-face with doctors' },
              { icon: Clock, title: '24/7 Available', desc: 'Round the clock service' },
              { icon: Calendar, title: 'Easy Scheduling', desc: 'Book appointments instantly' },
              { icon: CheckCircle, title: 'Verified Doctors', desc: 'Licensed professionals' },
              { icon: CheckCircle, title: 'Specialty', desc: 'Filter by specialty' }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-lg text-center">
                <item.icon className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Filter by Specialty</h2>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Search specialty..."
                value={selectedSpecialty || searchSpecialty}
                onChange={(e) => {
                  setSearchSpecialty(e.target.value)
                  setSelectedSpecialty('')
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button 
                onClick={handleSearch}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Search className="h-5 w-5" />
                <span>Search</span>
              </button>
            </div>
            {searchSpecialty && !selectedSpecialty && (
              <div className="flex flex-wrap gap-3 max-h-60 overflow-y-auto">
                {filteredSpecialties.map((specialty) => (
                  <button
                    key={specialty}
                    onClick={() => {
                      setSelectedSpecialty(specialty)
                      setSearchSpecialty('')
                    }}
                    className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
                  >
                    {specialty}
                  </button>
                ))}
              </div>
            )}
          </div>

          {showDoctors && filteredDoctors.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Doctors</h2>
              <div className="space-y-4">
                {filteredDoctors.map((doctor, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{doctor.name}</h3>
                      <p className="text-sm text-gray-600">{doctor.specialty}</p>
                      <p className="text-sm text-green-600">Available: {doctor.available}</p>
                      <p className="text-sm text-gray-700 mt-1">Fee: ₹{doctor.fee}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-2">⭐ {doctor.rating}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleStartCall(doctor)}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
                    >
                      <Video className="h-4 w-4" />
                      <span>Start Video Call</span>
                    </button>
                    <button
                      onClick={() => handleSchedule(doctor)}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2"
                    >
                      <Calendar className="h-4 w-4" />
                      <span>Schedule</span>
                    </button>
                  </div>
                </div>
                ))}
              </div>
            </div>
          )}

          {/* Video Call Modal */}
          {showCallModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Video Call</h2>
                  <button onClick={() => setShowCallModal(false)} className="text-gray-400 hover:text-gray-600">
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Video className="h-10 w-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{selectedDoctor?.name}</h3>
                  <p className="text-gray-600">{selectedDoctor?.specialty}</p>
                  <p className="text-gray-700 mt-2">Consultation Fee: ₹{selectedDoctor?.fee}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      alert('Starting video call...')
                      setShowCallModal(false)
                    }}
                    className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2"
                  >
                    <Phone className="h-5 w-5" />
                    <span>Call Now</span>
                  </button>
                  <button
                    onClick={() => setShowCallModal(false)}
                    className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Schedule Modal */}
          {showScheduleModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Schedule Appointment</h2>
                  <button onClick={() => setShowScheduleModal(false)} className="text-gray-400 hover:text-gray-600">
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{selectedDoctor?.name}</h3>
                  <p className="text-gray-600">{selectedDoctor?.specialty}</p>
                  <p className="text-gray-700 mt-1">Fee: ₹{selectedDoctor?.fee}</p>
                </div>
                <form onSubmit={handleScheduleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                    <input
                      type="date"
                      required
                      value={scheduleData.date}
                      onChange={(e) => setScheduleData({...scheduleData, date: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
                    <select
                      required
                      value={scheduleData.time}
                      onChange={(e) => setScheduleData({...scheduleData, time: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Choose time</option>
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="03:00 PM">03:00 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                      <option value="05:00 PM">05:00 PM</option>
                    </select>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                    >
                      Confirm Schedule
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowScheduleModal(false)}
                      className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Telemedicine
