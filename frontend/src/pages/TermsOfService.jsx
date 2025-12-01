import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="h-10 w-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Terms of Service</h1>
          </div>
          <p className="text-gray-600 mb-8">Last updated: January 2024</p>

          <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Acceptance of Terms</h2>
              <p className="text-gray-600">By accessing and using MediCare AI, you accept and agree to be bound by these Terms of Service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Medical Disclaimer</h2>
              <p className="text-gray-600 mb-2">Important: This platform provides health information for educational purposes only.</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                <li>Not a substitute for professional medical advice</li>
                <li>Always consult qualified healthcare providers</li>
                <li>In emergencies, call 911 immediately</li>
                <li>AI recommendations are not diagnoses</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">User Responsibilities</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                <li>Provide accurate health information</li>
                <li>Maintain account security</li>
                <li>Respect healthcare professionals</li>
                <li>Attend scheduled appointments</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Prohibited Activities</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                <li>Misuse of platform services</li>
                <li>Sharing false health information</li>
                <li>Harassment of healthcare providers</li>
                <li>Unauthorized access to accounts</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Limitation of Liability</h2>
              <p className="text-gray-600">MediCare AI is not liable for medical outcomes. Users assume all risks associated with health decisions made using this platform.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Changes to Terms</h2>
              <p className="text-gray-600">We reserve the right to modify these terms. Continued use constitutes acceptance of updated terms.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default TermsOfService
