import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Stethoscope, Menu, X, Phone, MapPin, Activity, User, Mail, Lock, Check, ShoppingCart } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState({ firstName: '', lastName: '', gender: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [userGender, setUserGender] = useState('')
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const passwordValidation = {
    length: password.length >= 6,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.email || !formData.password || (isSignUp && (!formData.firstName || !formData.lastName || !formData.gender || !formData.phone))) {
      alert('Please fill all required fields')
      return
    }
    if (isSignUp && !Object.values(passwordValidation).every(v => v)) {
      alert('Password does not meet requirements')
      return
    }
    if (isSignUp && password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }
    const name = formData.firstName ? `${formData.firstName} ${formData.lastName}` : formData.email.split('@')[0]
    const userData = {
      name,
      email: formData.email,
      phone: formData.phone || '',
      gender: formData.gender || ''
    }
    localStorage.setItem('user', JSON.stringify(userData))
    setIsLoggedIn(true)
    setUserName(name)
    setUserEmail(formData.email)
    setUserPhone(formData.phone || '')
    setUserGender(formData.gender || '')
    setShowAuthModal(false)
    setSuccessMessage(isSignUp ? 'Account created successfully!' : 'Signed in successfully!')
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    setUserName('')
    setUserEmail('')
    setUserPhone('')
    setUserGender('')
    setShowProfileMenu(false)
    setShowProfileModal(false)
    setFormData({ firstName: '', lastName: '', gender: '', email: '', phone: '', password: '', confirmPassword: '' })
    setPassword('')
    setConfirmPassword('')
  }

  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const user = JSON.parse(savedUser)
      setIsLoggedIn(true)
      setUserName(user.name)
      setUserEmail(user.email)
      setUserPhone(user.phone)
      setUserGender(user.gender)
    }

    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      setCartCount(cart.length)
    }
    updateCartCount()
    window.addEventListener('cartUpdated', updateCartCount)
    return () => window.removeEventListener('cartUpdated', updateCartCount)
  }, [])

  const navItems = [
    { name: 'Home', path: '/', icon: Activity },
    { name: 'Symptom Checker', path: '/symptoms', icon: Stethoscope },
    { name: 'Find Doctors', path: '/doctors', icon: MapPin },
    { name: 'Medicine Store', path: '/medicines', icon: ShoppingCart },
    { name: 'Emergency', path: '/emergency', icon: Phone },
  ]

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white shadow-lg sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-green-500 to-blue-600 p-2 rounded-lg">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
                MediCare AI
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
            <button onClick={() => window.dispatchEvent(new Event('openCart'))} className="relative text-gray-700 hover:text-blue-600 transition-colors flex items-center space-x-1">
              <ShoppingCart className="h-5 w-5" />
              <span className="text-sm font-medium">Cart</span>
              {cartCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            {isLoggedIn ? (
              <div className="relative">
                    <button 
                      onClick={() => setShowProfileMenu(!showProfileMenu)}
                      className="text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-medium">
                        {userName.charAt(0).toUpperCase()}
                      </div>
                    </button>
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-200">
                    <button 
                      onClick={() => {
                        setShowProfileModal(true)
                        setShowProfileMenu(false)
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </button>
                    <Link to="/order-status" className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Your Orders
                    </Link>
                    <Link to="/settings" className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => {
                  setShowAuthModal(true)
                  setIsSignUp(false)
                }}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center"
              >
                <User className="h-4 w-4 mr-2" />
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
              <div className="pt-2">
                {isLoggedIn ? (
                    <div className="space-y-2">
                    <div className="flex items-center justify-center px-3 py-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-medium text-lg">
                        {userName.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        setShowProfileModal(true)
                        setIsOpen(false)
                      }}
                      className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      Profile
                    </button>
                    <Link to="/order-status" onClick={() => setIsOpen(false)} className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                      Your Orders
                    </Link>
                    <Link to="/settings" onClick={() => setIsOpen(false)} className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-red-600 hover:bg-gray-100 rounded-md"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => {
                      setShowAuthModal(true)
                      setIsSignUp(false)
                      setIsOpen(false)
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 flex items-center justify-center"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-20 right-4 z-50">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2"
          >
            <Check className="h-5 w-5" />
            <span className="font-medium">{successMessage}</span>
          </motion.div>
        </div>
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        placeholder="First name"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        placeholder="Last name"
                        className="input-field"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender *
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          required
                          name="gender"
                          value="Male"
                          checked={formData.gender === 'Male'}
                          onChange={(e) => setFormData({...formData, gender: e.target.value})}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-gray-700">Male</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          required
                          name="gender"
                          value="Female"
                          checked={formData.gender === 'Female'}
                          onChange={(e) => setFormData({...formData, gender: e.target.value})}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-gray-700">Female</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="Enter your phone number"
                        className="input-field pl-10"
                      />
                    </div>
                  </div>
                </>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Enter your email"
                    className="input-field pl-10"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setFormData({...formData, password: e.target.value})
                    }}
                    placeholder="Enter your password"
                    className="input-field pl-10"
                  />
                </div>
                {isSignUp && password && (
                  <div className="mt-2 space-y-1 text-xs">
                    <div className={`flex items-center ${passwordValidation.length ? 'text-green-600' : 'text-gray-500'}`}>
                      <Check className={`h-3 w-3 mr-1 ${passwordValidation.length ? 'opacity-100' : 'opacity-30'}`} />
                      At least 6 characters
                    </div>
                    <div className={`flex items-center ${passwordValidation.upper ? 'text-green-600' : 'text-gray-500'}`}>
                      <Check className={`h-3 w-3 mr-1 ${passwordValidation.upper ? 'opacity-100' : 'opacity-30'}`} />
                      One uppercase letter
                    </div>
                    <div className={`flex items-center ${passwordValidation.lower ? 'text-green-600' : 'text-gray-500'}`}>
                      <Check className={`h-3 w-3 mr-1 ${passwordValidation.lower ? 'opacity-100' : 'opacity-30'}`} />
                      One lowercase letter
                    </div>
                    <div className={`flex items-center ${passwordValidation.number ? 'text-green-600' : 'text-gray-500'}`}>
                      <Check className={`h-3 w-3 mr-1 ${passwordValidation.number ? 'opacity-100' : 'opacity-30'}`} />
                      One number
                    </div>
                    <div className={`flex items-center ${passwordValidation.special ? 'text-green-600' : 'text-gray-500'}`}>
                      <Check className={`h-3 w-3 mr-1 ${passwordValidation.special ? 'opacity-100' : 'opacity-30'}`} />
                      One special character
                    </div>
                  </div>
                )}
              </div>
              
              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value)
                        setFormData({...formData, confirmPassword: e.target.value})
                      }}
                      placeholder="Confirm your password"
                      className="input-field pl-10"
                    />
                  </div>
                  {confirmPassword && (
                    <div className={`mt-1 text-xs flex items-center ${password === confirmPassword ? 'text-green-600' : 'text-red-600'}`}>
                      <Check className={`h-3 w-3 mr-1 ${password === confirmPassword ? 'opacity-100' : 'opacity-30'}`} />
                      {password === confirmPassword ? 'Passwords match' : 'Passwords do not match'}
                    </div>
                  )}
                </div>
              )}
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all"
              >
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </button>
            </form>
            
            <div className="mt-4 text-center">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </button>
            </div>
            
            <button
              onClick={() => setShowAuthModal(false)}
              className="mt-4 w-full text-gray-600 hover:text-gray-800 text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
              <button
                onClick={() => setShowProfileModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-3xl mb-4">
                {userName.charAt(0).toUpperCase()}
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
                <div className="flex items-center space-x-2 text-gray-900">
                  <User className="h-4 w-4 text-gray-400" />
                  <span>{userName}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Gender</label>
                <div className="flex items-center space-x-2 text-gray-900">
                  <User className="h-4 w-4 text-gray-400" />
                  <span>{userGender || 'Not provided'}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                <div className="flex items-center space-x-2 text-gray-900">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>{userEmail}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
                <div className="flex items-center space-x-2 text-gray-900">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{userPhone || 'Not provided'}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setShowProfileModal(false)}
              className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </motion.nav>
  )
}

export default Navbar