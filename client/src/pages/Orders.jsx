"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Package, Calendar, CreditCard, Truck } from "lucide-react"
import axios from "axios"
import toast from "react-hot-toast"

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await axios.get("/api/orders/my-orders")
      setOrders(response.data)
    } catch (error) {
      toast.error("Failed to fetch orders")
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "paid":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <CreditCard className="w-4 h-4" />
      case "paid":
        return <Package className="w-4 h-4" />
      case "shipped":
        return <Truck className="w-4 h-4" />
      case "delivered":
        return <Package className="w-4 h-4" />
      default:
        return <Package className="w-4 h-4" />
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-16">
        <Package className="w-24 h-24 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No orders yet</h2>
        <p className="text-gray-600 mb-8">Start shopping to see your orders here</p>
        <Link to="/products" className="btn-primary">
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="card p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Order #</span>
                  <span className="font-mono text-sm font-medium">{order._id.slice(-8).toUpperCase()}</span>
                </div>
                <div
                  className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
                >
                  {getStatusIcon(order.status)}
                  <span className="capitalize">{order.status}</span>
                </div>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="font-semibold text-gray-900">₹{order.totalAmount.toLocaleString()}</div>
              </div>
            </div>

            <div className="space-y-4">
              {order.items?.map((item, i) => {
                if (!item?.product) return null

                return (
                  <div key={item.product._id || i} className="flex items-center space-x-4">
                    <img
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name || "Product"}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <Link
                        to={`/products/${item.product._id}`}
                        className="font-medium text-gray-900 hover:text-primary-600 transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span>Qty: {item.quantity}</span>
                        <span>₹{item.price.toLocaleString()} each</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</div>
                    </div>
                  </div>
                )
              })}
            </div>

            {order.shippingAddress && (
              <div className="mt-6 pt-6 border-t">
                <h4 className="font-medium text-gray-900 mb-2">Shipping Address</h4>
                <p className="text-gray-600 text-sm">
                  {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.zipCode}, {order.shippingAddress.country}
                </p>
              </div>
            )}

            {order.paymentId && (
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Payment ID: <span className="font-mono">{order.paymentId}</span>
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
