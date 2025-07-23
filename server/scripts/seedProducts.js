import mongoose from "mongoose"
import Product from "../models/Product.js"
import dotenv from "dotenv"

dotenv.config()

const products = [
  {
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    price: 2999,
    image: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
    stock: 50,
    rating: 4.5,
    numReviews: 128,
  },
  {
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracker with heart rate monitoring, GPS, and smartphone connectivity.",
    price: 8999,
    image: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
    stock: 30,
    rating: 4.3,
    numReviews: 89,
  },
  {
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and sustainable organic cotton t-shirt available in multiple colors.",
    price: 799,
    image: "/placeholder.svg?height=300&width=300",
    category: "Clothing",
    stock: 100,
    rating: 4.2,
    numReviews: 245,
  },
  {
    name: "Leather Laptop Bag",
    description: "Premium leather laptop bag with multiple compartments and adjustable strap.",
    price: 3499,
    image: "/placeholder.svg?height=300&width=300",
    category: "Accessories",
    stock: 25,
    rating: 4.7,
    numReviews: 67,
  },
  {
    name: "Stainless Steel Water Bottle",
    description: "Insulated stainless steel water bottle that keeps drinks cold for 24 hours.",
    price: 1299,
    image: "/placeholder.svg?height=300&width=300",
    category: "Home & Kitchen",
    stock: 75,
    rating: 4.4,
    numReviews: 156,
  },
  {
    name: "Wireless Phone Charger",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
    price: 1599,
    image: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
    stock: 60,
    rating: 4.1,
    numReviews: 93,
  },
  {
    name: "Running Shoes",
    description: "Lightweight running shoes with advanced cushioning and breathable mesh upper.",
    price: 4999,
    image: "/placeholder.svg?height=300&width=300",
    category: "Sports",
    stock: 40,
    rating: 4.6,
    numReviews: 178,
  },
  {
    name: "Coffee Maker",
    description: "Programmable coffee maker with thermal carafe and auto-brew feature.",
    price: 6999,
    image: "/placeholder.svg?height=300&width=300",
    category: "Home & Kitchen",
    stock: 20,
    rating: 4.3,
    numReviews: 112,
  },
]

async function seedProducts() {
  try {
    await mongoose.connect("mongodb+srv://ashish061104:aTAiZK5UtBXLFzNK@cluster1.xxrii6r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1")

    // Clear existing products
    await Product.deleteMany({})

    // Insert new products
    await Product.insertMany(products)

    console.log("Products seeded successfully!")
    process.exit(0)
  } catch (error) {
    console.error("Error seeding products:", error)
    process.exit(1)
  }
}

seedProducts()
