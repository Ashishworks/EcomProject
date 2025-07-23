"use client"

import { Link } from "react-router-dom"
import { ShoppingCart, Star } from "lucide-react"
import { useCart } from "../context/CartContext"

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product._id)
  }

  return (
    <div className="card hover:shadow-lg transition-shadow duration-300">
      <Link to={`/products/${product._id}`}>
        <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-4">
        <Link to={`/products/${product._id}`}>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">({product.numReviews})</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary-600">₹{product.price.toLocaleString()}</span>
          <button
            onClick={handleAddToCart}
            className="flex items-center btn-primary text-sm"
            disabled={product.stock === 0}
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>

        {product.stock > 0 && product.stock <= 10 && (
          <p className="text-orange-600 text-sm mt-2">Only {product.stock} left in stock!</p>
        )}
      </div>
    </div>
  )
}

export default ProductCard
