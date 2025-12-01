import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="h-10 w-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
          <p className="text-gray-600 mb-8">Last updated: January 2024</p>

          <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Information We Collect</h2>
              <p className="text-gray-600 mb-2">We collect information that you provide directly to us, including:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                <li>Personal information (name, email, phone number)</li>
                <li>Health information (symptoms, medical history)</li>
                <li>Appointment and consultation records</li>
                <li>Payment information (processed securely)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">How We Use Your Information</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                <li>Provide and improve our medical services</li>
                <li>Connect you with healthcare professionals</li>
                <li>Send appointment reminders and health updates</li>
                <li>Ensure platform security and prevent fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Data Security</h2>
              <p className="text-gray-600">We implement industry-standard security measures including encryption, secure servers, and regular security audits to protect your health information.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Your Rights</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                <li>Access your personal and health data</li>
                <li>Request data correction or deletion</li>
                <li>Opt-out of marketing communications</li>
                <li>Download your health records</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Contact Us</h2>
              <p className="text-gray-600">For privacy concerns, contact us at privacy@medicareai.com</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
