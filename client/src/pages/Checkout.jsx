
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { CreditCard, MapPin, Package } from "lucide-react"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import axios from "axios"
import toast from "react-hot-toast"
import { PinContainer } from "../animations/PinContainer"

const API = import.meta.env.VITE_API_URL 

const Checkout = () => {
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
  })
  const [loading, setLoading] = useState(false)
  const [orderCreated, setOrderCreated] = useState(false)

  const { cartItems, getCartTotal } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const subtotal = getCartTotal()
  const tax = Math.round(subtotal * 0.18)
  const total = subtotal + tax

  useEffect(() => {
    if (cartItems.length === 0 && !orderCreated) {
      navigate("/cart")
    }
  }, [cartItems, navigate, orderCreated])

  const handleAddressChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    })
  }

  const validateAddress = () => {
    const required = ["street", "city", "state", "zipCode"]
    return required.every((field) => shippingAddress[field].trim())
  }

  const handlePayment = async () => {
    if (!validateAddress()) {
      toast.error("Please fill in all address fields")
      return
    }

    setLoading(true)

    try {
      const orderItems = cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      }))

      const orderResponse = await axios.post(`${API}/api/orders/create`, {
        items: orderItems,
        totalAmount: total,
        shippingAddress,
      })

      const order = orderResponse.data.order

      const paymentResponse = await axios.post(`${API}/api/payment/create-order`, {
        amount: total,
        currency: "INR",
      })

      const { orderId, amount, currency } = paymentResponse.data

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_1234567890",
        amount,
        currency,
        name: "Curators Shop",
        description: "Order Payment",
        order_id: orderId,
        handler: async (response) => {
          try {
            await axios.post(`${API}/api/payment/verify`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: order._id,
            })

            setOrderCreated(true)
            toast.success("Payment successful! Order placed.")
            navigate("/orders")
          } catch (error) {
            toast.error("Payment verification failed")
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#2563eb",
        },
        modal: {
          ondismiss: () => {
            setLoading(false)
          },
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (error) {
      toast.error("Failed to process payment")
      setLoading(false)
    }
  }

  if (cartItems.length === 0 && !orderCreated) {
    return null
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <MapPin className="w-5 h-5 text-primary-600 mr-2" />
              <h2 className="text-xl font-semibold">Shipping Address</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                <input
                  type="text"
                  name="street"
                  value={shippingAddress.street}
                  onChange={handleAddressChange}
                  className="input-field"
                  placeholder="Enter your street address"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleAddressChange}
                    className="input-field"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <input
                    type="text"
                    name="state"
                    value={shippingAddress.state}
                    onChange={handleAddressChange}
                    className="input-field"
                    placeholder="State"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={shippingAddress.zipCode}
                    onChange={handleAddressChange}
                    className="input-field"
                    placeholder="ZIP Code"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={shippingAddress.country}
                    onChange={handleAddressChange}
                    className="input-field"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <Package className="w-5 h-5 text-primary-600 mr-2" />
              <h2 className="text-xl font-semibold">Order Summary</h2>
            </div>

            <div className="space-y-4">
              {cartItems
                .filter((item) => item && item.product)
                .map((item) => (
                  <div key={item.product._id} className="flex items-center space-x-4">
                    <img
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name || "Product"}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                      <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-medium">
                      ₹{(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
            </div>

            <div className="border-t mt-6 pt-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (18%)</span>
                <span className="font-medium">₹{tax.toLocaleString()}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center mb-4">
              <CreditCard className="w-5 h-5 text-primary-600 mr-2" />
              <h2 className="text-xl font-semibold">Payment</h2>
            </div>

            <p className="text-gray-600 mb-6">
              Secure payment powered by Razorpay. We accept all major credit cards, debit cards, and UPI.
            </p>

            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full btn-primary text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed bg-black"
            >
              {loading ? "Processing..." : `Pay ₹${total.toLocaleString()}`}
            </button>

            <p className="text-xs text-gray-500 mt-4 text-center">
              By placing this order, you agree to our terms and conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
