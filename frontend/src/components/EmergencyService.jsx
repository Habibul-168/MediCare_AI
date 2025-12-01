import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, MapPin, Clock, Ambulance, AlertTriangle, Navigation, Search } from 'lucide-react'

const EmergencyService = () => {
  const [location, setLocation] = useState('')
  const [emergency, setEmergency] = useState('')
  const [isRequesting, setIsRequesting] = useState(false)
  const [showCallConfirm, setShowCallConfirm] = useState(false)
  const [ambulanceDispatched, setAmbulanceDispatched] = useState(false)
  const [hospitalToCall, setHospitalToCall] = useState(null)
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false)
  const [hospitalSearch, setHospitalSearch] = useState('')
  const [showHospitalSuggestions, setShowHospitalSuggestions] = useState(false)
  
  const indianLocations = [
    'Mumbai, Maharashtra', 'Delhi', 'Bangalore, Karnataka', 'Hyderabad, Telangana',
    'Chennai, Tamil Nadu', 'Kolkata, West Bengal', 'Pune, Maharashtra', 'Ahmedabad, Gujarat',
    'Jaipur, Rajasthan', 'Lucknow, Uttar Pradesh', 'Surat, Gujarat', 'Kanpur, Uttar Pradesh',
    'Nagpur, Maharashtra', 'Indore, Madhya Pradesh', 'Thane, Maharashtra', 'Bhopal, Madhya Pradesh'
  ]

  const emergencyTypes = [
    { type: 'Heart Attack', icon: '❤️', priority: 'Critical' },
    { type: 'Stroke', icon: '🧠', priority: 'Critical' },
    { type: 'Severe Injury', icon: '🩹', priority: 'High' },
    { type: 'Breathing Problems', icon: '🫁', priority: 'High' },
    { type: 'Allergic Reaction', icon: '⚠️', priority: 'High' },
    { type: 'Poisoning', icon: '☠️', priority: 'Critical' },
    { type: 'Burns', icon: '🔥', priority: 'Medium' },
    { type: 'Other Emergency', icon: '🚨', priority: 'Medium' }
  ]

  const nearbyHospitals = [
    {
      name: 'City General Hospital',
      distance: '2.1 km',
      eta: '8 mins',
      phone: '9876543210',
      emergency: true
    },
    {
      name: 'St. Mary Medical Center',
      distance: '3.5 km',
      eta: '12 mins',
      phone: '9876543211',
      emergency: true
    },
    {
      name: 'Regional Trauma Center',
      distance: '5.2 km',
      eta: '15 mins',
      phone: '9876543212',
      emergency: true
    },
    {
      name: 'Apollo Multispecialty Hospital',
      distance: '6.8 km',
      eta: '18 mins',
      phone: '9876543213',
      emergency: true
    },
    {
      name: 'Fortis Healthcare Center',
      distance: '7.3 km',
      eta: '20 mins',
      phone: '9876543214',
      emergency: true
    },
    {
      name: 'Max Super Specialty Hospital',
      distance: '8.5 km',
      eta: '22 mins',
      phone: '9876543215',
      emergency: true
    },
    {
      name: 'Medanta Emergency Care',
      distance: '9.2 km',
      eta: '25 mins',
      phone: '9876543216',
      emergency: true
    },
    {
      name: 'AIIMS Emergency Wing',
      distance: '10.1 km',
      eta: '28 mins',
      phone: '9876543217',
      emergency: true
    },
    {
      name: 'Manipal Hospital',
      distance: '11.5 km',
      eta: '30 mins',
      phone: '9876543218',
      emergency: true
    }
  ]

  const requestAmbulance = () => {
    if (!emergency || !location) return
    
    setIsRequesting(true)
    setTimeout(() => {
      setIsRequesting(false)
      setAmbulanceDispatched(true)
    }, 2000)
  }

  const callEmergency = () => {
    setShowCallConfirm(true)
  }

  const confirmCall = () => {
    window.open('tel:108')
    setShowCallConfirm(false)
  }

  const callHospital = (hospital) => {
    setHospitalToCall(hospital)
  }

  const confirmHospitalCall = () => {
    window.open(`tel:${hospitalToCall.phone}`)
    setHospitalToCall(null)
  }

  const handleLocationChange = (value) => {
    setLocation(value)
    setShowLocationSuggestions(value.length > 0)
  }

  const selectLocation = (loc) => {
    setLocation(loc)
    setShowLocationSuggestions(false)
  }

  const filteredLocations = indianLocations.filter(loc => 
    loc.toLowerCase().includes(location.toLowerCase())
  )

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Emergency Medical Services
          </h1>
          <p className="text-xl text-gray-600">
            24/7 emergency support and ambulance services
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Emergency Request */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Quick Emergency Call */}
            <div className="card bg-red-50 border-red-200">
              <div className="text-center">
                <AlertTriangle className="h-16 w-16 text-red-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-red-900 mb-4">
                  Life-Threatening Emergency?
                </h2>
                <button
                  onClick={callEmergency}
                  className="bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-xl hover:bg-red-700 transition-colors flex items-center mx-auto"
                >
                  <Phone className="h-6 w-6 mr-2" />
                  Call 108 Now
                </button>
                <p className="text-red-700 mt-3 text-sm">
                  For immediate life-threatening emergencies
                </p>
                
                {showCallConfirm && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Emergency Call</h3>
                      <p className="text-gray-600 mb-6">Are you sure you want to call 108 emergency services?</p>
                      <div className="flex space-x-3">
                        <button
                          onClick={confirmCall}
                          className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700"
                        >
                          Yes, Call 108
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
              </div>
            </div>

            {/* Ambulance Request */}
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Ambulance className="h-6 w-6 text-blue-600 mr-2" />
                Request Ambulance
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => handleLocationChange(e.target.value)}
                      onFocus={() => setShowLocationSuggestions(location.length > 0)}
                      placeholder="Enter your current location"
                      className="input-field pl-10"
                    />
                    {showLocationSuggestions && filteredLocations.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {filteredLocations.map((loc, index) => (
                          <div
                            key={index}
                            onClick={() => selectLocation(loc)}
                            className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm text-gray-700"
                          >
                            <MapPin className="h-4 w-4 inline mr-2 text-gray-400" />
                            {loc}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <button className="text-blue-600 text-sm mt-1 flex items-center">
                    <Navigation className="h-4 w-4 mr-1" />
                    Use current location
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Type of Emergency
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {emergencyTypes.map((type) => (
                      <button
                        key={type.type}
                        onClick={() => setEmergency(type.type)}
                        className={`p-3 rounded-lg border text-left transition-colors ${
                          emergency === type.type
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">{type.icon}</span>
                          <div>
                            <div className="font-medium text-sm">{type.type}</div>
                            <div className={`text-xs ${
                              type.priority === 'Critical' ? 'text-red-600' :
                              type.priority === 'High' ? 'text-orange-600' :
                              'text-yellow-600'
                            }`}>
                              {type.priority}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {ambulanceDispatched ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <Ambulance className="h-12 w-12 text-green-600 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-green-900 mb-2">Ambulance Dispatched!</h3>
                    <p className="text-green-700 text-sm mb-2">ETA: 8-12 minutes</p>
                    <p className="text-green-600 text-xs">Emergency: {emergency}</p>
                    <p className="text-green-600 text-xs">Location: {location}</p>
                  </div>
                ) : (
                  <button
                    onClick={requestAmbulance}
                    disabled={!emergency || !location || isRequesting}
                    className="btn-primary w-full flex items-center justify-center"
                  >
                    {isRequesting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Dispatching Ambulance...
                      </>
                    ) : (
                      <>
                        <Ambulance className="h-5 w-5 mr-2" />
                        Request Ambulance
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Nearby Hospitals */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <MapPin className="h-6 w-6 text-green-600 mr-2" />
                Nearby Hospitals
              </h2>

              <div className="mb-4 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={hospitalSearch}
                  onChange={(e) => {
                    setHospitalSearch(e.target.value)
                    setShowHospitalSuggestions(e.target.value.length > 0)
                  }}
                  onFocus={() => setShowHospitalSuggestions(hospitalSearch.length > 0)}
                  onBlur={() => setTimeout(() => setShowHospitalSuggestions(false), 200)}
                  placeholder="Search hospitals..."
                  className="input-field pl-10"
                />
                {showHospitalSuggestions && nearbyHospitals.filter(h => 
                  h.name.toLowerCase().includes(hospitalSearch.toLowerCase())
                ).length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {nearbyHospitals.filter(h => 
                      h.name.toLowerCase().includes(hospitalSearch.toLowerCase())
                    ).map((hospital, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setHospitalSearch(hospital.name)
                          setShowHospitalSuggestions(false)
                        }}
                        className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm text-gray-700"
                      >
                        <MapPin className="h-4 w-4 inline mr-2 text-gray-400" />
                        {hospital.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {nearbyHospitals.filter(hospital => 
                  hospital.name.toLowerCase().includes(hospitalSearch.toLowerCase())
                ).map((hospital, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-gray-900">{hospital.name}</h3>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        24/7 Emergency
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        {hospital.distance}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        ETA: {hospital.eta}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => callHospital(hospital)}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </button>
                      <button 
                        onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(hospital.name)}`, '_blank')}
                        className="flex-1 border border-green-600 text-green-600 py-2 px-4 rounded-lg font-medium hover:bg-green-50 transition-colors flex items-center justify-center"
                      >
                        <Navigation className="h-4 w-4 mr-2" />
                        Directions
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {hospitalToCall && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Hospital Call</h3>
                  <p className="text-gray-600 mb-2">Call {hospitalToCall.name}?</p>
                  <p className="text-gray-500 text-sm mb-6">{hospitalToCall.phone}</p>
                  <div className="flex space-x-3">
                    <button
                      onClick={confirmHospitalCall}
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700"
                    >
                      Yes, Call
                    </button>
                    <button
                      onClick={() => setHospitalToCall(null)}
                      className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Emergency Tips */}
            <div className="card bg-yellow-50 border-yellow-200">
              <h3 className="text-lg font-bold text-yellow-900 mb-4">
                Emergency Tips
              </h3>
              <ul className="space-y-2 text-yellow-800 text-sm">
                <li>• Stay calm and assess the situation</li>
                <li>• Call 108 for life-threatening emergencies</li>
                <li>• Provide clear location information</li>
                <li>• Follow dispatcher instructions</li>
                <li>• Keep the patient comfortable and still</li>
                <li>• Don't move severely injured patients</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default EmergencyService