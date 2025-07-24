"use client"

import { Link } from "react-router-dom"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import { useCart } from "../context/CartContext"
import SpotlightCard from "../animations/SpotLightCard"

const Cart = () => {
  const { cartItems, loading, updateCartItem, removeFromCart, clearCart, getCartTotal } = useCart()

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
    } else {
      updateCartItem(productId, newQuantity)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!cartItems.length) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some products to get started</p>
        <Link to="/products" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    )
  }

  const total = getCartTotal()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        <button onClick={clearCart} className="text-red-600 hover:text-red-700 transition-colors">
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
        <div className="lg:col-span-2 space-y-4  ">
          {cartItems
            .filter((item) => item && item.product) 
            .map((item) => (

              <div key={item.product._id} className="card p-2 bg-black rounded-3xl">
                <SpotlightCard spotlightColor="rgba(5, 220, 244, 1)">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name || "Product"}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <Link
                        to={`/products/${item.product._id}`}
                        className="text-lg font-semibold text-white hover:text-primary-600 transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-white text-sm mt-1">
                        ₹{item.product.price.toLocaleString()} each
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="flex items-center border border-white rounded-lg">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.product._id, item.quantity - 1)
                          }
                          className="p-2 hover:bg-white transition-colors"
                        >
                          <Minus className="w-4 h-4 text-white" />
                        </button>
                        <span className="px-4 py-2 border-x border-white min-w-16 text-center text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.product._id, item.quantity + 1)
                          }
                          className="p-2 hover:bg-white transition-colors"
                          disabled={item.quantity >= item.product.stock}
                        >
                          <Plus className="w-4 h-4 text-white" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product._id)}
                        className="text-red-600 hover:text-red-700 transition-colors p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-white">
                      Subtotal: ₹{(item.product.price * item.quantity).toLocaleString()}
                    </span>
                    {item.quantity >= item.product.stock && (
                      <span className="text-orange-600 text-sm">Maximum quantity reached</span>
                    )}
                  </div>
                </SpotlightCard>
              </div>

            ))}
        </div>

        <div className="lg:col-span-1">

          <div className="card sticky top-24 p-2 bg-black rounded-3xl">
            <SpotlightCard>
              <h2 className="text-xl font-bold text-white mb-4 ">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-white">Subtotal</span>
                  <span className="font-medium text-white">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">Shipping</span>
                  <span className="font-medium text-white">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">Tax</span>
                  <span className="font-medium text-white">₹{Math.round(total * 0.18).toLocaleString()}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold text-white">
                    <span>Total</span>
                    <span>₹{Math.round(total * 1.18).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Link to="/checkout" className="w-full btn-primary text-center block bg-black rounded-2xl">
                Proceed to Checkout
              </Link>

              <Link to="/products" className="w-full btn-primary text-center block mt-3 bg-black rounded-2xl">
                Continue Shopping
              </Link>
            </SpotlightCard>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Cart
