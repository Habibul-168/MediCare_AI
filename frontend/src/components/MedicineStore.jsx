import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Pill, ShoppingCart, Search, X, MapPin, CreditCard, Smartphone, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { medicines } from '../data/medicineData'
import { useAuth } from '../context/AuthContext'

const MedicineStore = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [checkoutData, setCheckoutData] = useState({
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: '',
    // payment-specific
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
    const savedCart = localStorage.getItem('cart')
    if (savedCart) setCart(JSON.parse(savedCart))
    
    const handleCartClick = () => setShowCart(true)
    window.addEventListener('openCart', handleCartClick)
    return () => window.removeEventListener('openCart', handleCartClick)
  }, [])

  const filteredMedicines = medicines.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const addToCart = (medicine) => {
    const existing = cart.find(item => item.id === medicine.id)
    let newCart
    if (existing) {
      newCart = cart.map(item => 
        item.id === medicine.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    } else {
      newCart = [...cart, { ...medicine, quantity: 1 }]
    }
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const removeFromCart = (id) => {
    const newCart = cart.filter(item => item.id !== id)
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const updateQuantity = (id, change) => {
    const newCart = cart.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + change
        if (newQty <= 0) return null
        return { ...item, quantity: newQty }
      }
      return item
    }).filter(item => item !== null)
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = +(subtotal * 0.05).toFixed(2)
  const deliveryFee = subtotal > 100 ? 0 : (subtotal === 0 ? 0 : 25)
  const totalAmount = +(subtotal + tax + deliveryFee).toFixed(2)

  const handleCheckout = (e) => {
    e.preventDefault()

    // build order object
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

    // save to localStorage orders array
    const existing = JSON.parse(localStorage.getItem('orders') || '[]')
    existing.push(order)
    localStorage.setItem('orders', JSON.stringify(existing))

    // show confirmation then redirect to OrderStatus
    setOrderPlaced(true)
    setTimeout(() => {
      setOrderPlaced(false)
      setCart([])
      localStorage.removeItem('cart')
      window.dispatchEvent(new Event('cartUpdated'))
      setShowCheckout(false)
      setShowCart(false)
      setCheckoutData({ address: '', city: '', state: '', pincode: '', paymentMethod: '' })
      navigate('/order-status')
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Pill className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Recommended Medicines</h1>
          <p className="text-xl text-gray-600">Browse and order medicines recommended by our AI system</p>
        </motion.div>

        <div className="mb-8">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setShowSuggestions(e.target.value.length > 0)
              }}
              onFocus={() => searchTerm && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="Search medicines by name or category..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoComplete="off"
            />
            {showSuggestions && filteredMedicines.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {filteredMedicines.slice(0, 8).map((med) => (
                  <div
                    key={med.id}
                    onClick={() => {
                      setSearchTerm(med.name)
                      setShowSuggestions(false)
                    }}
                    className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b last:border-b-0"
                  >
                    <div className="flex items-center space-x-3">
                      <img src={med.image} alt={med.name} className="w-10 h-10 object-cover rounded" />
                      <div>
                        <p className="font-semibold text-gray-900">{med.name}</p>
                        <p className="text-xs text-gray-600">{med.category} - ₹{med.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {filteredMedicines.map((medicine) => {
            const inCart = cart.find(item => item.id === medicine.id)
            return (
              <motion.div
                key={medicine.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <img src={medicine.image} alt={medicine.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                <div className="mb-4">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    {medicine.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{medicine.name}</h3>
                <p className="text-sm text-gray-600 mb-1">Dosage: {medicine.dosage}</p>
                <p className="text-2xl font-bold text-green-600 mb-4">₹{medicine.price}</p>
                {inCart ? (
                  <div className="flex items-center justify-between bg-white border-2 border-blue-600 rounded-lg p-2">
                    <button
                      onClick={() => updateQuantity(medicine.id, -1)}
                      className="w-8 h-8 bg-blue-600 text-white rounded-full hover:bg-blue-700 font-bold"
                    >
                      -
                    </button>
                    <span className="font-bold text-blue-600">{inCart.quantity}</span>
                    <button
                      onClick={() => updateQuantity(medicine.id, 1)}
                      className="w-8 h-8 bg-blue-600 text-white rounded-full hover:bg-blue-700 font-bold"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(medicine)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </button>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Cart Modal */}
        {showCart && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Shopping Cart ({cart.length})</h2>
                <button onClick={() => setShowCart(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="h-6 w-6" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between border-b pb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.dosage}</p>
                          <p className="text-lg font-bold text-green-600">₹{item.price}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300"
                            >
                              -
                            </button>
                            <span className="font-semibold w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 mb-6">
                    <div className="space-y-2 mb-4">
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
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl font-bold text-gray-900">Total Amount:</span>
                      <span className="text-2xl font-bold text-green-600">₹{totalAmount.toFixed(2)}</span>
                    </div>
                    <button
                      onClick={() => {
                        if (!isAuthenticated) {
                          navigate('/login')
                          return
                        }
                        setShowCart(false)
                        setShowCheckout(true)
                      }}
                      className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Checkout Modal */}
        {showCheckout && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
                <button onClick={() => setShowCheckout(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="h-6 w-6" />
                </button>
              </div>

              {orderPlaced ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-900 mb-2">Order Placed Successfully!</h3>
                  <p className="text-gray-600">Your medicines will be delivered soon.</p>
                </div>
              ) : (
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
                    {/* Conditional payment fields */}
                    {checkoutData.paymentMethod === 'upi' && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Enter your UPI ID *</label>
                        <input
                          type="text"
                          required
                          value={checkoutData.upiId}
                          onChange={(e) => setCheckoutData({...checkoutData, upiId: e.target.value})}
                          placeholder="example@upi"
                          className="input-field"
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
                            className="input-field"
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
                              className="input-field"
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
                              className="input-field"
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
                              className="input-field"
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
                            className="input-field"
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
                            className="input-field"
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
                            className="input-field"
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
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MedicineStore
