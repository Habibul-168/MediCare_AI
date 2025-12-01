import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight } from 'lucide-react'

const Blog = () => {
  const posts = [
    { title: '10 Tips for Better Heart Health', author: 'Dr. Sarah Johnson', date: 'Jan 15, 2024', category: 'Cardiology', excerpt: 'Learn essential tips to maintain a healthy heart and prevent cardiovascular diseases.' },
    { title: 'Understanding AI in Healthcare', author: 'Tech Team', date: 'Jan 12, 2024', category: 'Technology', excerpt: 'How artificial intelligence is revolutionizing medical diagnosis and treatment.' },
    { title: 'Mental Health Awareness', author: 'Dr. Michael Chen', date: 'Jan 10, 2024', category: 'Mental Health', excerpt: 'Breaking the stigma and understanding the importance of mental wellness.' },
    { title: 'Nutrition Guide for Diabetes', author: 'Dr. Emily Brown', date: 'Jan 8, 2024', category: 'Nutrition', excerpt: 'A comprehensive guide to managing diabetes through proper nutrition.' },
    { title: 'Telemedicine: The Future is Now', author: 'Admin', date: 'Jan 5, 2024', category: 'Innovation', excerpt: 'How virtual healthcare is making medical care more accessible than ever.' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Health Blog</h1>
          <p className="text-gray-600 mb-12">Latest insights on health, wellness, and medical technology</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-indigo-500"></div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mt-3 mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center"><User className="h-4 w-4 mr-1" />{post.author}</span>
                    <span className="flex items-center"><Calendar className="h-4 w-4 mr-1" />{post.date}</span>
                  </div>
                  <button className="text-blue-600 font-semibold flex items-center hover:text-blue-700">
                    Read More <ArrowRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Blog
