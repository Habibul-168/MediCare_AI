import { motion } from 'framer-motion'
import { Search, HelpCircle, Book, MessageCircle } from 'lucide-react'

const HelpCenter = () => {
  const faqs = [
    { q: 'How do I book an appointment?', a: 'Navigate to Find Doctors, select a doctor, and click Book Appointment.' },
    { q: 'Is my health data secure?', a: 'Yes, we use bank-level encryption to protect all your medical information.' },
    { q: 'How does the symptom checker work?', a: 'Our AI analyzes your symptoms and provides possible conditions and recommendations.' },
    { q: 'Can I cancel an appointment?', a: 'Yes, you can cancel up to 2 hours before the scheduled time.' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-gray-600 mb-8">Find answers to your questions</p>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for help..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { icon: Book, title: 'User Guide', desc: 'Step-by-step tutorials' },
              { icon: MessageCircle, title: 'Live Chat', desc: 'Chat with support' },
              { icon: HelpCircle, title: 'FAQs', desc: 'Common questions' }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow cursor-pointer">
                <item.icon className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-gray-200 pb-4 last:border-0">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default HelpCenter
