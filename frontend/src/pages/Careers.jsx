import { motion } from 'framer-motion'
import { Briefcase, MapPin, Clock } from 'lucide-react'

const Careers = () => {
  const jobs = [
    { title: 'Senior Full Stack Developer', location: 'Remote', type: 'Full-time', dept: 'Engineering' },
    { title: 'Medical AI Specialist', location: 'New York, NY', type: 'Full-time', dept: 'AI Research' },
    { title: 'Healthcare Product Manager', location: 'San Francisco, CA', type: 'Full-time', dept: 'Product' },
    { title: 'UX/UI Designer', location: 'Remote', type: 'Full-time', dept: 'Design' },
    { title: 'Customer Success Manager', location: 'Boston, MA', type: 'Full-time', dept: 'Support' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Careers at MediCare AI</h1>
          <p className="text-xl text-gray-600 mb-12">Join us in transforming healthcare</p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { title: 'Innovation', desc: 'Work on cutting-edge AI healthcare solutions' },
              { title: 'Impact', desc: 'Make a difference in millions of lives' },
              { title: 'Growth', desc: 'Continuous learning and career development' }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-lg text-center">
                <h3 className="font-bold text-gray-900 text-xl mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Open Positions</h2>
            <div className="space-y-4">
              {jobs.map((job, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span className="flex items-center"><MapPin className="h-4 w-4 mr-1" />{job.location}</span>
                        <span className="flex items-center"><Clock className="h-4 w-4 mr-1" />{job.type}</span>
                        <span className="flex items-center"><Briefcase className="h-4 w-4 mr-1" />{job.dept}</span>
                      </div>
                    </div>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 whitespace-nowrap">
                      Apply Now
                    </button>
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

export default Careers
