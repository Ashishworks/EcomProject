"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, ShoppingCart, Star, Minus, Plus } from "lucide-react"
import axios from "axios"
import { useCart } from "../context/CartContext"
import toast from "react-hot-toast"
import { CometCard } from "../animations/CometCard"

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`/api/products/${id}`)
      setProduct(response.data)
    } catch (error) {
      toast.error("Failed to fetch product details")
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    addToCart(product._id, quantity)
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-gray-600">Product not found</p>
        <Link to="/products" className="btn-primary mt-4 inline-block">
          Back to Products
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <Link to="/products" className="flex items-center text-primary-600 hover:text-primary-700 transition-colors">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        <div className="space-y-3">
          <CometCard>
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-96 lg:h-[500px] object-contain rounded-lg shadow-lg"
          />
          </CometCard>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-gray-600 text-lg">{product.description}</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600">
              {product.rating} ({product.numReviews} reviews)
            </span>
          </div>

          <div className="text-3xl font-bold text-primary-600">₹{product.price.toLocaleString()}</div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Availability:</span>
            {product.stock > 0 ? (
              <span className="text-green-600 font-medium">In Stock ({product.stock} available)</span>
            ) : (
              <span className="text-red-600 font-medium">Out of Stock</span>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Category:</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">{product.category}</span>
          </div>

          {product.stock > 0 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={decrementQuantity}
                    className="p-2 hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300 min-w-16 text-center">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="p-2 hover:bg-gray-100 transition-colors"
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full btn-primary text-lg py-3 flex items-center justify-center bg-black"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </button>
            </div>
          )}

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Features</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• High quality materials</li>
              <li>• Fast shipping available</li>
              <li>• 30-day return policy</li>
              <li>• Customer support included</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
