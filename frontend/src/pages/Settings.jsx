import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { User, ShoppingCart, Settings as SettingsIcon, Bell, Shield, Palette, Globe, HelpCircle } from 'lucide-react'

export default function Settings() {
  const [orderTrackingEnabled, setOrderTrackingEnabled] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true
  })
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    shareData: false
  })
  const [theme, setTheme] = useState('light')
  const [language, setLanguage] = useState('english')

  useEffect(() => {
    const stored = localStorage.getItem('orderTrackingEnabled')
    setOrderTrackingEnabled(stored === 'true')
    
    const storedNotifications = localStorage.getItem('notifications')
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications))
    }
    
    const storedPrivacy = localStorage.getItem('privacy')
    if (storedPrivacy) {
      setPrivacy(JSON.parse(storedPrivacy))
    }
    
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme) {
      setTheme(storedTheme)
    }
    
    const storedLanguage = localStorage.getItem('language')
    if (storedLanguage) {
      setLanguage(storedLanguage)
    }
  }, [])

  const toggleOrderTracking = () => {
    const next = !orderTrackingEnabled
    setOrderTrackingEnabled(next)
    localStorage.setItem('orderTrackingEnabled', next ? 'true' : 'false')
  }

  const updateNotifications = (key, value) => {
    const updated = { ...notifications, [key]: value }
    setNotifications(updated)
    localStorage.setItem('notifications', JSON.stringify(updated))
  }

  const updatePrivacy = (key, value) => {
    const updated = { ...privacy, [key]: value }
    setPrivacy(updated)
    localStorage.setItem('privacy', JSON.stringify(updated))
  }

  const updateTheme = (newTheme) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const updateLanguage = (newLanguage) => {
    setLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <div className="text-center mb-8">
          <SettingsIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-xl text-gray-600">Manage your account preferences and settings</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Profile Section */}
          <section className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <User className="h-6 w-6 text-blue-600" />
              <span>Profile & Account</span>
            </h2>
            <p className="text-sm text-gray-600 mb-4">Manage your profile and account settings.</p>
            <div className="space-y-3">
              <Link to="/order-status" className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all">
                <ShoppingCart className="h-5 w-5" />
                <span>Track Your Orders</span>
              </Link>
              <Link to="/health-checkup" className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-teal-600 text-white px-4 py-3 rounded-lg hover:from-green-700 hover:to-teal-700 transition-all">
                <User className="h-5 w-5" />
                <span>Health Checkup Booking</span>
              </Link>
              <Link to="/telemedicine" className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
                <User className="h-5 w-5" />
                <span>Telemedicine Booking</span>
              </Link>
            </div>
          </section>

          {/* Order Tracking */}
          <section className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Order Tracking</h2>
            <p className="text-sm text-gray-600 mb-4">Enable or disable order tracking notifications.</p>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-sm font-medium">Enable order tracking</span>
                <input 
                  type="checkbox" 
                  checked={orderTrackingEnabled} 
                  onChange={toggleOrderTracking} 
                  className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500" 
                />
              </label>
            </div>
          </section>

          {/* Notifications */}
          <section className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <Bell className="h-6 w-6 text-blue-600" />
              <span>Notifications</span>
            </h2>
            <p className="text-sm text-gray-600 mb-4">Choose how you want to receive notifications.</p>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-sm font-medium">Email notifications</span>
                <input 
                  type="checkbox" 
                  checked={notifications.email} 
                  onChange={(e) => updateNotifications('email', e.target.checked)} 
                  className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500" 
                />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm font-medium">SMS notifications</span>
                <input 
                  type="checkbox" 
                  checked={notifications.sms} 
                  onChange={(e) => updateNotifications('sms', e.target.checked)} 
                  className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500" 
                />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm font-medium">Push notifications</span>
                <input 
                  type="checkbox" 
                  checked={notifications.push} 
                  onChange={(e) => updateNotifications('push', e.target.checked)} 
                  className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500" 
                />
              </label>
            </div>
          </section>

          {/* Privacy */}
          <section className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <Shield className="h-6 w-6 text-blue-600" />
              <span>Privacy</span>
            </h2>
            <p className="text-sm text-gray-600 mb-4">Control your privacy and data sharing preferences.</p>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-sm font-medium">Profile visible to others</span>
                <input 
                  type="checkbox" 
                  checked={privacy.profileVisible} 
                  onChange={(e) => updatePrivacy('profileVisible', e.target.checked)} 
                  className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500" 
                />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm font-medium">Share data for improvements</span>
                <input 
                  type="checkbox" 
                  checked={privacy.shareData} 
                  onChange={(e) => updatePrivacy('shareData', e.target.checked)} 
                  className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500" 
                />
              </label>
            </div>
          </section>

          {/* Theme */}
          <section className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <Palette className="h-6 w-6 text-blue-600" />
              <span>Appearance</span>
            </h2>
            <p className="text-sm text-gray-600 mb-4">Choose your preferred theme.</p>
            <div className="space-y-2">
              <label className="flex items-center space-x-3">
                <input 
                  type="radio" 
                  name="theme" 
                  value="light" 
                  checked={theme === 'light'} 
                  onChange={(e) => updateTheme(e.target.value)} 
                  className="h-4 w-4 text-blue-600" 
                />
                <span className="text-sm font-medium">Light theme</span>
              </label>
              <label className="flex items-center space-x-3">
                <input 
                  type="radio" 
                  name="theme" 
                  value="dark" 
                  checked={theme === 'dark'} 
                  onChange={(e) => updateTheme(e.target.value)} 
                  className="h-4 w-4 text-blue-600" 
                />
                <span className="text-sm font-medium">Dark theme</span>
              </label>
              <label className="flex items-center space-x-3">
                <input 
                  type="radio" 
                  name="theme" 
                  value="auto" 
                  checked={theme === 'auto'} 
                  onChange={(e) => updateTheme(e.target.value)} 
                  className="h-4 w-4 text-blue-600" 
                />
                <span className="text-sm font-medium">Auto (system)</span>
              </label>
            </div>
          </section>

          {/* Language */}
          <section className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <Globe className="h-6 w-6 text-blue-600" />
              <span>Language</span>
            </h2>
            <p className="text-sm text-gray-600 mb-4">Select your preferred language.</p>
            <select 
              value={language} 
              onChange={(e) => updateLanguage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="english">English</option>
              <option value="spanish">Español</option>
              <option value="french">Français</option>
              <option value="german">Deutsch</option>
              <option value="hindi">हिन्दी</option>
            </select>
          </section>
        </div>

        {/* Help Section */}
        <section className="bg-white shadow-lg rounded-xl p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <HelpCircle className="h-6 w-6 text-blue-600" />
            <span>Help & Support</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link to="/help" className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-all">
              <HelpCircle className="h-5 w-5" />
              <span>Help Center</span>
            </Link>
            <Link to="/contact" className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-all">
              <User className="h-5 w-5" />
              <span>Contact Us</span>
            </Link>
            <Link to="/privacy" className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-all">
              <Shield className="h-5 w-5" />
              <span>Privacy Policy</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
