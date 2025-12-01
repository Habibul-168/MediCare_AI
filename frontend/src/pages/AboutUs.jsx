import { motion } from 'framer-motion'
import { Heart, Users, Award, Target } from 'lucide-react'

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About MediCare AI</h1>
          <p className="text-xl text-gray-600 mb-12">Revolutionizing healthcare through AI and compassion</p>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 text-lg">To make quality healthcare accessible to everyone through innovative AI technology, connecting patients with the right care at the right time.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <Target className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
              <p className="text-gray-600">A world where healthcare is accessible, affordable, and personalized for every individual.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <Heart className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Values</h3>
              <p className="text-gray-600">Compassion, innovation, integrity, and patient-first approach in everything we do.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Us</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Users className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">10,000+ Patients</h3>
                <p className="text-gray-600">Trusted by thousands</p>
              </div>
              <div className="text-center">
                <Award className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">500+ Doctors</h3>
                <p className="text-gray-600">Verified professionals</p>
              </div>
              <div className="text-center">
                <Heart className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
                <p className="text-gray-600">Always here for you</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Join Our Healthcare Revolution</h2>
            <p className="text-lg mb-6">Experience the future of healthcare today</p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
              Get Started
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AboutUs
