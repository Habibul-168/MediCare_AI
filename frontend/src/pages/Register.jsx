import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Check } from 'lucide-react'

const Register = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', gender: '', email: '', password: '', confirmPassword: '', phone: '' })
  const [error, setError] = useState('')
  const { register, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate('/')
  }, [isAuthenticated, navigate])

  const passwordValidation = {
    length: formData.password.length >= 8,
    upper: /[A-Z]/.test(formData.password),
    lower: /[a-z]/.test(formData.password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!Object.values(passwordValidation).every(v => v)) {
      setError('Password does not meet requirements')
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    try {
      const fullName = `${formData.firstName} ${formData.lastName}`
      await register(fullName, formData.email, formData.password, formData.phone)
      navigate(-1)
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">First Name *</label>
              <input type="text" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Last Name *</label>
              <input type="text" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Gender *</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={(e) => setFormData({...formData, gender: e.target.value})} className="mr-2" required />
                Male
              </label>
              <label className="flex items-center">
                <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={(e) => setFormData({...formData, gender: e.target.value})} className="mr-2" required />
                Female
              </label>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Email *</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Phone</label>
            <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password *</label>
            <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            {formData.password && (
              <div className="mt-2 space-y-1 text-xs">
                <div className={`flex items-center ${passwordValidation.length ? 'text-green-600' : 'text-gray-500'}`}>
                  <Check className={`h-3 w-3 mr-1 ${passwordValidation.length ? 'opacity-100' : 'opacity-30'}`} />
                  At least 8 characters
                </div>
                <div className={`flex items-center ${passwordValidation.upper ? 'text-green-600' : 'text-gray-500'}`}>
                  <Check className={`h-3 w-3 mr-1 ${passwordValidation.upper ? 'opacity-100' : 'opacity-30'}`} />
                  One uppercase letter
                </div>
                <div className={`flex items-center ${passwordValidation.lower ? 'text-green-600' : 'text-gray-500'}`}>
                  <Check className={`h-3 w-3 mr-1 ${passwordValidation.lower ? 'opacity-100' : 'opacity-30'}`} />
                  One lowercase letter
                </div>
                <div className={`flex items-center ${passwordValidation.special ? 'text-green-600' : 'text-gray-500'}`}>
                  <Check className={`h-3 w-3 mr-1 ${passwordValidation.special ? 'opacity-100' : 'opacity-30'}`} />
                  One special character
                </div>
              </div>
            )}
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Confirm Password *</label>
            <input type="password" value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            {formData.confirmPassword && (
              <div className={`mt-1 text-xs flex items-center ${formData.password === formData.confirmPassword ? 'text-green-600' : 'text-red-600'}`}>
                <Check className={`h-3 w-3 mr-1 ${formData.password === formData.confirmPassword ? 'opacity-100' : 'opacity-30'}`} />
                {formData.password === formData.confirmPassword ? 'Passwords match' : 'Passwords do not match'}
              </div>
            )}
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Sign Up</button>
        </form>
        <p className="text-center mt-4 text-gray-600">Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Sign In</Link></p>
      </div>
    </div>
  )
}

export default Register
