import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, Video, X } from 'lucide-react'

const Appointments = () => {
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('appointments') || '[]')
    setAppointments(saved)
  }, [])

  const cancelAppointment = (id) => {
    const updated = appointments.filter(apt => apt.id !== id)
    setAppointments(updated)
    localStorage.setItem('appointments', JSON.stringify(updated))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-gray-900 mb-8">My Appointments</h1>

          {appointments.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No appointments scheduled</p>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((apt) => (
                <motion.div
                  key={apt.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <User className="h-5 w-5 text-blue-600" />
                        <h3 className="text-xl font-bold text-gray-900">{apt.doctor.name}</h3>
                      </div>
                      <p className="text-gray-600 mb-2">{apt.doctor.specialty}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-700">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{apt.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{apt.time}</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          {apt.status}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => cancelAppointment(apt.id)}
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

export default Appointments
