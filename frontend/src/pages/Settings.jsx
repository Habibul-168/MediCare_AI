import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { User, ShoppingCart } from 'lucide-react'

export default function Settings() {
  const [orderTrackingEnabled, setOrderTrackingEnabled] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('orderTrackingEnabled')
    setOrderTrackingEnabled(stored === 'true')
  }, [])

  const toggleOrderTracking = () => {
    const next = !orderTrackingEnabled
    setOrderTrackingEnabled(next)
    localStorage.setItem('orderTrackingEnabled', next ? 'true' : 'false')
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="bg-white shadow rounded-lg p-4 sm:p-6">
          <h2 className="text-lg font-semibold mb-2 flex items-center space-x-2"><User className="h-5 w-5" /><span>Profile</span></h2>
          <p className="text-sm text-gray-600">Manage your profile and preferences.</p>
          <div className="mt-4">
            <Link to="/order-status" className="w-full md:inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-md">
              <ShoppingCart className="h-4 w-4" />
              <span>Your Orders</span>
            </Link>
          </div>
        </section>

        <section className="bg-white shadow rounded-lg p-4 sm:p-6">
          <h2 className="text-lg font-semibold mb-2">Order Tracking</h2>
          <p className="text-sm text-gray-600">Enable or disable order tracking notifications for your account (demo setting — stored locally).</p>
          <div className="mt-4">
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={orderTrackingEnabled} onChange={toggleOrderTracking} className="h-4 w-4" />
              <span className="text-sm">Enable order tracking</span>
            </label>
          </div>
        </section>
      </div>
    </div>
  )
}
