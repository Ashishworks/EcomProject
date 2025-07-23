"use client"

import { useState, useEffect } from "react"
import { Search, Filter } from "lucide-react"
import axios from "axios"
import ProductCard from "../components/ProductCard"
import toast from "react-hot-toast"
import RotatingText from "../animations/RotatingText"
import ScrollVelocity from "../animations/ScrollVelocity"
import { BackgroundLines } from "../animations/BackgorundLines"

const Products = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [currentPage, selectedCategory, searchTerm])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const params = {
        page: currentPage,
        limit: 12,
      }

      if (selectedCategory) params.category = selectedCategory
      if (searchTerm) params.search = searchTerm

      const response = await axios.get("/api/products", { params })
      setProducts(response.data.products)
      setTotalPages(response.data.totalPages)
    } catch (error) {
      toast.error("Failed to fetch products")
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/products/categories/all")
      setCategories(response.data)
    } catch (error) {
      console.error("Failed to fetch categories")
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchProducts()
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="space-y-8">

      <div className="text-center bg-gray-100 py-2 rounded-3xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 flex justify-center"><RotatingText
          texts={['WELCOME TO THE BEST', 'ONLINE SHOPPING PLATFORM']} /></h1>
        <p className="text-lg text-gray-600">Discover amazing products at great prices</p>
      </div>
      <div className="w-[200%] scale-50 origin-top-left bg-black text-white p-4 rounded-3xl mt-2">
        <div className="w-[83%] flex justify-center ">
          <ScrollVelocity texts={['UPTO 50% OFF']} />
        </div>

      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative flex my-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-10" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </form>

        <div className="flex items-center gap-4 z-10">
          <Filter className="w-5 h-5 text-gray-600" />
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="input-field min-w-48"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600">No products found</p>
          <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 border rounded-lg ${currentPage === page
                  ? "bg-primary-600 text-white border-primary-600"
                  : "border-gray-300 hover:bg-gray-50"
                  }`}
              >
                {page}
              </button>
            )
          })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}

    </div>
  )
}

export default Products
