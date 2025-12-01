import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Stethoscope, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
  const footerLinks = {
    'Services': [
      { name: 'Symptom Checker', path: '/symptoms' },
      { name: 'Find Doctors', path: '/doctors' },
      { name: 'Emergency Services', path: '/emergency' },
      { name: 'Health Records', path: '/health-records' },
      { name: 'Telemedicine', path: '/telemedicine' }
    ],
    'Support': [
      { name: 'Help Center', path: '/help' },
      { name: 'Contact Us', path: '/contact' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'FAQ', path: '/faq' }
    ],
    'Company': [
      { name: 'About Us', path: '/about' },
      { name: 'Partners', path: '#' },
      { name: 'Blog', path: '/blog' }
    ]
  }

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-600' },
    { icon: Linkedin, href: '#', color: 'hover:text-blue-700' }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-2 mb-4"
            >
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">MediCare AI</span>
            </motion.div>
            
            <p className="text-gray-300 mb-6 max-w-md">
              Your trusted AI-powered health assistant providing instant symptom analysis, 
              doctor connections, and emergency services. Healthcare made accessible and intelligent.
            </p>

            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Phone className="h-4 w-4 mr-3" />
                <span>Emergency: 108 | Support: +91 9873546801 -Kolkata</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-3" />
                <span>support@medicareai.com</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="h-4 w-4 mr-3" />
                <span>Available, 24/7 support</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-gray-400 text-sm mb-4 md:mb-0"
            >
              © 2025 MediCare AI. All rights reserved. | Licensed Healthcare Technology Provider
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex space-x-4"
            >
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`text-gray-400 ${social.color} transition-colors duration-200`}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Medical Disclaimer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-6 p-4 bg-gray-800 rounded-lg"
          >
            <p className="text-gray-400 text-xs text-center">
              <strong>Medical Disclaimer:</strong> This platform provides AI-powered health information for educational purposes only. 
              It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of qualified 
              healthcare providers with any questions regarding medical conditions. In case of emergency, call 108 immediately.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer