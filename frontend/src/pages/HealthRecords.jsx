import { motion } from 'framer-motion'
import { FileText, Download, Upload, Calendar, Activity, X } from 'lucide-react'
import { useState } from 'react'

const HealthRecords = () => {
  const [records, setRecords] = useState([
    { id: 1, type: 'Lab Report', date: '2024-11-15', doctor: 'Dr. Rajesh Kumar', status: 'Complete' },
    { id: 2, type: 'Prescription', date: '2024-12-10', doctor: 'Dr. Priya Sharma', status: 'Active' },
    { id: 3, type: 'X-Ray', date: '2025-01-05', doctor: 'Dr. Amit Patel', status: 'Complete' }
  ])
  const [showUpload, setShowUpload] = useState(false)
  const [uploadData, setUploadData] = useState({ type: '', doctor: '', date: '', file: null })

  const handleUpload = (e) => {
    e.preventDefault()
    const newRecord = {
      id: records.length + 1,
      type: uploadData.type,
      date: uploadData.date,
      doctor: uploadData.doctor,
      status: 'Complete'
    }
    setRecords([newRecord, ...records])
    setShowUpload(false)
    setUploadData({ type: '', doctor: '', date: '', file: null })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Health Records</h1>
          <p className="text-gray-600 mb-8">Access and manage your medical records securely</p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <FileText className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Total Records</h3>
              <p className="text-3xl font-bold text-blue-600">24</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Activity className="h-8 w-8 text-green-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Active Prescriptions</h3>
              <p className="text-3xl font-bold text-green-600">3</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Calendar className="h-8 w-8 text-purple-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Upcoming Appointments</h3>
              <p className="text-3xl font-bold text-purple-600">2</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Recent Records ({records.length})</h2>
              <button onClick={() => setShowUpload(true)} className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                <Upload className="h-4 w-4" />
                <span>Upload Record ({records.length})</span>
              </button>
            </div>

            {showUpload && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Upload Medical Record</h3>
                    <button onClick={() => setShowUpload(false)} className="text-gray-500 hover:text-gray-700">
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  <form onSubmit={handleUpload} className="space-y-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Record Type *</label>
                      <select required value={uploadData.type} onChange={(e) => setUploadData({...uploadData, type: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="">Select type</option>
                        <option value="Lab Report">Lab Report</option>
                        <option value="Prescription">Prescription</option>
                        <option value="X-Ray">X-Ray</option>
                        <option value="MRI Scan">MRI Scan</option>
                        <option value="CT Scan">CT Scan</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Doctor Name *</label>
                      <input required type="text" value={uploadData.doctor} onChange={(e) => setUploadData({...uploadData, doctor: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Dr. Name" />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Date *</label>
                      <input required type="date" value={uploadData.date} onChange={(e) => setUploadData({...uploadData, date: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Upload File *</label>
                      <input required type="file" onChange={(e) => setUploadData({...uploadData, file: e.target.files[0]})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" accept=".pdf,.jpg,.jpeg,.png" />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
                      Upload Record
                    </button>
                  </form>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {records.map(record => (
                <div key={record.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-900">{record.type}</h3>
                      <p className="text-sm text-gray-600">{record.doctor}</p>
                      <p className="text-sm text-gray-500">{record.date}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm ${record.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        {record.status}
                      </span>
                      <button className="text-blue-600 hover:text-blue-700">
                        <Download className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default HealthRecords
