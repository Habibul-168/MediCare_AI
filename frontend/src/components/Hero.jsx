import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Stethoscope, Brain, MapPin, Phone, ArrowRight, Video, FileText, Activity, Pill } from 'lucide-react'
import MedicalScene from './MedicalScene'

const Hero = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI Symptom Analysis',
      description: 'Get instant medical insights based on your symptoms',
      link: '/symptoms',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Stethoscope,
      title: 'Find Doctors',
      description: 'Connect with qualified doctors in your area',
      link: '/doctors',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Phone,
      title: 'Emergency Services',
      description: '24/7 ambulance and emergency medical support',
      link: '/emergency',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Video,
      title: 'Telemedicine',
      description: 'Virtual consultations with doctors from home',
      link: '/telemedicine',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: FileText,
      title: 'Health Records',
      description: 'Access and manage your medical records securely',
      link: '/health-records',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Activity,
      title: 'Health Checkup',
      description: 'Book preventive health screenings and tests',
      link: '/health-checkup',
      color: 'from-teal-500 to-green-500'
    },
    {
      icon: Pill,
      title: 'Medicine Store',
      description: 'AI recommended medicines with best prices',
      link: '/medicines',
      color: 'from-pink-500 to-rose-500'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Your AI-Powered
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block">
                  Health Assistant
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Get instant symptom analysis, prescription recommendations, and connect with healthcare professionals. 
                Your health, powered by artificial intelligence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/symptoms" className="btn-primary inline-flex items-center justify-center">
                  Check Symptoms
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link to="/health-checkup" className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center justify-center">
                  Book Health Checkup
                  <Activity className="ml-2 h-5 w-5" />
                </Link>
                <Link to="/emergency" className="btn-secondary inline-flex items-center justify-center">
                  Emergency Help
                  <Phone className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <MedicalScene />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Complete Healthcare Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From symptom checking to emergency services, we provide comprehensive AI-powered healthcare assistance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="card group cursor-pointer"
              >
                <Link to={feature.link} className="block">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 mb-6">{feature.description}</p>
                  <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '10K+', label: 'Patients Helped' },
              { number: '500+', label: 'Doctors Connected' },
              { number: '24/7', label: 'Emergency Support' },
              { number: '95%', label: 'Accuracy Rate' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-white"
              >
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero