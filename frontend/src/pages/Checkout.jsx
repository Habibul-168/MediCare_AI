import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, CreditCard, Smartphone, ShoppingCart, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Checkout = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [cart, setCart] = useState([])
  const [checkoutData, setCheckoutData] = useState({
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: '',
    upiId: '',
    cardNumber: '',
    cardExpiryMonth: '',
    cardExpiryYear: '',
    cardCvv: '',
    bankName: '',
    accountNumber: '',
    ifsc: ''
  })
  const [orderPlaced, setOrderPlaced] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]')
    if (savedCart.length === 0) {
      navigate('/medicines')
      return
    }
    setCart(savedCart)
  }, [isAuthenticated, navigate])

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = +(subtotal * 0.05).toFixed(2)
  const deliveryFee = subtotal > 100 ? 0 : (subtotal === 0 ? 0 : 25)
  const totalAmount = +(subtotal + tax + deliveryFee).toFixed(2)

  const handleCheckout = (e) => {
    e.preventDefault()

    const order = {
      id: `ORD-${Date.now()}`,
      items: cart.map(i => ({ id: i.id, name: i.name, qty: i.quantity, price: i.price })),
      subtotal: +subtotal.toFixed(2),
      tax: +tax.toFixed(2),
      delivery: +deliveryFee.toFixed(2),
      total: +totalAmount.toFixed(2),
      status: 'Placed',
      createdAt: Date.now()
    }

    const existing = JSON.parse(localStorage.getItem('orders') || '[]')
    existing.push(order)
    localStorage.setItem('orders', JSON.stringify(existing))

    setOrderPlaced(true)
    setTimeout(() => {
      setOrderPlaced(false)
      setCart([])
      localStorage.removeItem('cart')
      window.dispatchEvent(new Event('cartUpdated'))
      navigate('/order-status')
    }, 1200)
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="h-10 w-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-green-900 mb-2">Order Placed Successfully!</h3>
          <p className="text-gray-600">Your medicines will be delivered soon.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 md:p-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
            <button onClick={() => navigate('/medicines')} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleCheckout}>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-2 mb-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">{item.name} x {item.quantity}</span>
                    <span className="font-semibold text-gray-900">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 border-t pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Medicines (Subtotal):</span>
                  <span className="font-semibold text-gray-900">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Tax (5%):</span>
                  <span className="font-semibold text-gray-900">₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Delivery:</span>
                  <span className="font-semibold text-gray-900">{deliveryFee === 0 ? 'Free' : `₹${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900">Total Amount:</span>
                  <span className="text-2xl font-bold text-green-600">₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Delivery Address
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Address *</label>
                  <input
                    type="text"
                    required
                    value={checkoutData.address}
                    onChange={(e) => setCheckoutData({...checkoutData, address: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="House No, Street, Area"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">City *</label>
                    <input
                      type="text"
                      required
                      value={checkoutData.city}
                      onChange={(e) => setCheckoutData({...checkoutData, city: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">State *</label>
                    <input
                      type="text"
                      required
                      value={checkoutData.state}
                      onChange={(e) => setCheckoutData({...checkoutData, state: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="State"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Pincode *</label>
                  <input
                    type="text"
                    required
                    value={checkoutData.pincode}
                    onChange={(e) => setCheckoutData({...checkoutData, pincode: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="6-digit pincode"
                    maxLength="6"
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Payment Method
              </h3>
              <div className="space-y-3">
                <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <input
                    type="radio"
                    required
                    name="payment"
                    value="cod"
                    checked={checkoutData.paymentMethod === 'cod'}
                    onChange={(e) => setCheckoutData({...checkoutData, paymentMethod: e.target.value})}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-3 font-medium text-gray-900">Cash on Delivery</span>
                </label>
                <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <input
                    type="radio"
                    required
                    name="payment"
                    value="card"
                    checked={checkoutData.paymentMethod === 'card'}
                    onChange={(e) => setCheckoutData({...checkoutData, paymentMethod: e.target.value})}
                    className="w-4 h-4 text-blue-600"
                  />
                  <CreditCard className="ml-3 h-5 w-5 text-gray-600" />
                  <span className="ml-2 font-medium text-gray-900">Credit/Debit Card</span>
                </label>
                <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <input
                    type="radio"
                    required
                    name="payment"
                    value="upi"
                    checked={checkoutData.paymentMethod === 'upi'}
                    onChange={(e) => setCheckoutData({...checkoutData, paymentMethod: e.target.value})}
                    className="w-4 h-4 text-blue-600"
                  />
                  <Smartphone className="ml-3 h-5 w-5 text-gray-600" />
                  <span className="ml-2 font-medium text-gray-900">UPI (PhonePe, GPay, Paytm)</span>
                </label>
                <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <input
                    type="radio"
                    required
                    name="payment"
                    value="netbanking"
                    checked={checkoutData.paymentMethod === 'netbanking'}
                    onChange={(e) => setCheckoutData({...checkoutData, paymentMethod: e.target.value})}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-3 font-medium text-gray-900">Net Banking</span>
                </label>
              </div>
              {checkoutData.paymentMethod === 'upi' && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Enter your UPI ID *</label>
                  <input
                    type="text"
                    required
                    value={checkoutData.upiId}
                    onChange={(e) => setCheckoutData({...checkoutData, upiId: e.target.value})}
                    placeholder="example@upi"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              {checkoutData.paymentMethod === 'card' && (
                <div className="mt-4 space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Number *</label>
                    <input
                      type="text"
                      required
                      value={checkoutData.cardNumber}
                      onChange={(e) => setCheckoutData({...checkoutData, cardNumber: e.target.value})}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      maxLength={19}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Month *</label>
                      <input
                        type="text"
                        required
                        value={checkoutData.cardExpiryMonth}
                        onChange={(e) => setCheckoutData({...checkoutData, cardExpiryMonth: e.target.value})}
                        placeholder="MM"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        maxLength={2}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Year *</label>
                      <input
                        type="text"
                        required
                        value={checkoutData.cardExpiryYear}
                        onChange={(e) => setCheckoutData({...checkoutData, cardExpiryYear: e.target.value})}
                        placeholder="YY"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        maxLength={2}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
                      <input
                        type="password"
                        required
                        value={checkoutData.cardCvv}
                        onChange={(e) => setCheckoutData({...checkoutData, cardCvv: e.target.value})}
                        placeholder="CVV"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        maxLength={4}
                      />
                    </div>
                  </div>
                </div>
              )}

              {checkoutData.paymentMethod === 'netbanking' && (
                <div className="mt-4 space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name *</label>
                    <input
                      type="text"
                      required
                      value={checkoutData.bankName}
                      onChange={(e) => setCheckoutData({...checkoutData, bankName: e.target.value})}
                      placeholder="Your bank name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Account Number *</label>
                    <input
                      type="text"
                      required
                      value={checkoutData.accountNumber}
                      onChange={(e) => setCheckoutData({...checkoutData, accountNumber: e.target.value})}
                      placeholder="XXXXXXXXXXXX"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code *</label>
                    <input
                      type="text"
                      required
                      value={checkoutData.ifsc}
                      onChange={(e) => setCheckoutData({...checkoutData, ifsc: e.target.value})}
                      placeholder="ABCD0123456"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors text-lg"
            >
              Place Order - ₹{totalAmount}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default Checkout
