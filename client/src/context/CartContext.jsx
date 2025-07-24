
import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useAuth } from "./AuthContext"

const CartContext = createContext()
const API = import.meta.env.VITE_API_URL 

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchCart()
    } else {
      setCartItems([])
    }
  }, [user])

  const fetchCart = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API}/api/cart`)
      setCartItems(response.data)
    } catch (error) {
      console.error("Error fetching cart:", error)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (productId, quantity = 1) => {
    if (!user) {
      toast.error("Please login to add items to cart")
      return
    }

    try {
      const response = await axios.post(`${API}/api/cart/add`, { productId, quantity })
      setCartItems(response.data.cart)
      toast.success("Item added to cart!")
    } catch (error) {
      const message = error.response?.data?.message || "Failed to add item to cart"
      toast.error(message)
    }
  }

  const updateCartItem = async (productId, quantity) => {
    try {
      const response = await axios.put(`${API}/api/cart/update`, { productId, quantity })
      setCartItems(response.data.cart)
    } catch (error) {
      const message = error.response?.data?.message || "Failed to update cart"
      toast.error(message)
    }
  }

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(`${API}/api/cart/remove/${productId}`)
      setCartItems(response.data.cart)
      toast.success("Item removed from cart")
    } catch (error) {
      const message = error.response?.data?.message || "Failed to remove item"
      toast.error(message)
    }
  }

  const clearCart = async () => {
    try {
      await axios.delete(`${API}/api/cart/clear`)
      setCartItems([])
      toast.success("Cart cleared")
    } catch (error) {
      const message = error.response?.data?.message || "Failed to clear cart"
      toast.error(message)
    }
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity
    }, 0)
  }

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const value = {
    cartItems,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    fetchCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
