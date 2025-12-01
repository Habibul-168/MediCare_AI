import { motion } from 'framer-motion'
import { HelpCircle, ChevronDown } from 'lucide-react'
import { useState } from 'react'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      category: 'General',
      questions: [
        { q: 'What is MediCare AI?', a: 'MediCare AI is a comprehensive healthcare platform offering AI-powered symptom checking, doctor consultations, and emergency services.' },
        { q: 'Is the service available 24/7?', a: 'Yes, our emergency services and telemedicine consultations are available round the clock.' },
        { q: 'How much does it cost?', a: 'Basic features are free. Doctor consultations range from $50-$150 depending on specialty.' }
      ]
    },
    {
      category: 'Appointments',
      questions: [
        { q: 'How do I book an appointment?', a: 'Go to Find Doctors, select a doctor, choose a time slot, and confirm your booking.' },
        { q: 'Can I cancel or reschedule?', a: 'Yes, you can cancel or reschedule up to 2 hours before the appointment time.' },
        { q: 'What if I miss my appointment?', a: 'Missed appointments may incur a cancellation fee. Please notify us in advance.' }
      ]
    },
    {
      category: 'Privacy & Security',
      questions: [
        { q: 'Is my health data secure?', a: 'Yes, we use bank-level encryption and comply with HIPAA regulations to protect your data.' },
        { q: 'Who can access my records?', a: 'Only you and healthcare providers you authorize can access your medical records.' },
        { q: 'Can I delete my account?', a: 'Yes, you can request account deletion. Some records may be retained for legal compliance.' }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center space-x-3 mb-4">
            <HelpCircle className="h-10 w-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h1>
          </div>
          <p className="text-gray-600 mb-8">Find answers to common questions</p>

          <div className="space-y-6">
            {faqs.map((category, catIndex) => (
              <div key={catIndex} className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{category.category}</h2>
                <div className="space-y-3">
                  {category.questions.map((faq, qIndex) => {
                    const index = `${catIndex}-${qIndex}`
                    return (
                      <div key={qIndex} className="border-b border-gray-200 last:border-0 pb-3">
                        <button
                          onClick={() => setOpenIndex(openIndex === index ? null : index)}
                          className="w-full flex justify-between items-center text-left"
                        >
                          <h3 className="font-semibold text-gray-900">{faq.q}</h3>
                          <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
                        </button>
                        {openIndex === index && (
                          <p className="text-gray-600 mt-2">{faq.a}</p>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-600 text-white rounded-xl shadow-lg p-6 mt-8 text-center">
            <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
            <p className="mb-4">Our support team is here to help</p>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100">
              Contact Support
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default FAQ
