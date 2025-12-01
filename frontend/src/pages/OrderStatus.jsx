import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Check, Truck, Clock, X } from 'lucide-react'

const STATUS_STEPS = ['Placed', 'Packed', 'Out for Delivery', 'Delivered']

const OrderStatus = () => {
  const { id } = useParams()
  const [orders, setOrders] = useState([])
  const [order, setOrder] = useState(null)

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('orders') || '[]')
    setOrders(saved.reverse())
    if (id) {
      const found = saved.find(o => o.id === id)
      if (found) setOrder(found)
    }
  }, [id])

  const updateOrderStatus = (orderId, nextStatus) => {
    const all = JSON.parse(localStorage.getItem('orders') || '[]')
    const updated = all.map(o => o.id === orderId ? { ...o, status: nextStatus } : o)
    localStorage.setItem('orders', JSON.stringify(updated))
    setOrders(updated.slice().reverse())
    if (id) {
      const found = updated.find(o => o.id === id)
      setOrder(found || null)
    }
  }

  const advance = (o) => {
    const idx = STATUS_STEPS.indexOf(o.status)
    if (idx < STATUS_STEPS.length - 1) updateOrderStatus(o.id, STATUS_STEPS[idx + 1])
  }

  // If id provided, show single-order view
  if (id) {
    if (!order) return <div className="p-8">Order not found.</div>

    return (
      <div className="min-h-screen py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-2">Order Tracking</h2>
            <p className="text-sm text-gray-600 mb-4">Order ID: <span className="font-mono">{order.id}</span></p>

            <div className="space-y-4">
              {STATUS_STEPS.map((step) => (
                <div key={step} className="border p-4 rounded">
                  <div className="flex justify-between mb-2">
                    <span>{step}</span>
                    <span>{order.status === step ? 'In progress' : ''}</span>
                  </div>
                  <div className={`h-3 rounded ${order.status === step ? 'bg-green-500' : 'bg-gray-200'}`} />
                </div>
              ))}

              <div className="mt-4">
                <h3 className="font-semibold">Order summary</h3>
                <div className="text-sm text-gray-700">Subtotal: ₹{order.subtotal}</div>
                <div className="text-sm text-gray-700">Tax: ₹{order.tax}</div>
                <div className="text-sm text-gray-700">Delivery: {order.delivery === 0 ? 'Free' : `₹${order.delivery}`}</div>
                <div className="text-lg font-bold mt-2">Total: ₹{order.total}</div>
              </div>

              <div className="mt-4 flex space-x-2">
                <button onClick={() => advance(order)} className="px-3 py-1 bg-blue-600 text-white rounded">Advance</button>
                <button onClick={() => { updateOrderStatus(order.id, 'Cancelled'); navigate('/medicines') }} className="px-3 py-1 bg-red-100 text-red-700 rounded">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // otherwise show list of orders
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
        {orders.length === 0 ? (
          <div className="text-center py-12 text-gray-600">You have no orders yet.</div>
        ) : (
          <div className="space-y-6">
            {orders.map(o => (
              <div key={o.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm text-gray-500">Order ID: <span className="font-mono text-xs">{o.id}</span></div>
                    <div className="text-lg font-semibold">Placed: {new Date(o.createdAt).toLocaleString()}</div>
                    <div className="text-sm text-gray-700">Items: {o.items.length}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Total</div>
                    <div className="text-xl font-bold text-green-600">₹{o.total.toFixed(2)}</div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <div>Status: <span className="font-medium ml-1">{o.status}</span></div>
                  </div>

                  <div className="mt-3 flex items-center space-x-2">
                    {STATUS_STEPS.map((s, i) => (
                      <div key={s} className={`flex-1 text-center py-2 rounded ${o.status === s ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-100'}`}>
                        <div className="text-xs font-semibold">{s}</div>
                        <div className="text-2xs text-gray-500 mt-1">{i <= STATUS_STEPS.indexOf(o.status) ? '✓' : ''}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 flex space-x-2">
                    <button onClick={() => advance(o)} className="px-3 py-1 bg-blue-600 text-white rounded">Advance</button>
                    <button onClick={() => { updateOrderStatus(o.id, 'Cancelled'); navigate('/medicines') }} className="px-3 py-1 bg-red-100 text-red-700 rounded">Cancel</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderStatus
