import mongoose from "mongoose"
import Product from "../models/Product.js"
import dotenv from "dotenv"

dotenv.config()

const products = [
  {
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    price: 2999,
    image: "https://unixindia.in/cdn/shop/files/01_34af94b9-40d7-4956-805e-0cb7df907ef7.jpg?v=1747994450",
    category: "Electronics",
    stock: 50,
    rating: 4.5,
    numReviews: 128,
  },
  {
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracker with heart rate monitoring, GPS, and smartphone connectivity.",
    price: 8999,
    image: "https://media.istockphoto.com/id/1286099942/photo/close-up-of-hand-touching-smartwatch-with-health-app-on-the-screen-gadget-for-fitness-active.jpg?s=612x612&w=0&k=20&c=zX9Fko_T6qppRO8J8BSYu4DovmLjPFKwi_x6l0GzCq0=",
    category: "Electronics",
    stock: 30,
    rating: 4.3,
    numReviews: 89,
  },
  {
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and sustainable organic cotton t-shirt available in multiple colors.",
    price: 799,
    image: "https://dcassetcdn.com/design_img/3111633/459700/459700_17288423_3111633_3255700f_image.jpg",
    category: "Clothing",
    stock: 100,
    rating: 4.2,
    numReviews: 245,
  },
  {
    name: "Leather Laptop Bag",
    description: "Premium leather laptop bag with multiple compartments and adjustable strap.",
    price: 3499,
    image: "https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/714d94cc-0710-407c-8b48-2adf24168513._CR0%2C0%2C3000%2C2000_SX1500_.jpg",
    category: "Accessories",
    stock: 25,
    rating: 4.7,
    numReviews: 67,
  },
  {
    name: "Stainless Steel Water Bottle",
    description: "Insulated stainless steel water bottle that keeps drinks cold for 24 hours.",
    price: 1299,
    image: "https://www.shutterstock.com/image-vector/vector-realistic-3d-white-silver-260nw-2303420363.jpg",
    category: "Home & Kitchen",
    stock: 75,
    rating: 4.4,
    numReviews: 156,
  },
  {
    name: "Wireless Phone Charger",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
    price: 1599,
    image: "https://m.media-amazon.com/images/I/61k-B4NfGHL._UF894,1000_QL80_.jpg",
    category: "Electronics",
    stock: 60,
    rating: 4.1,
    numReviews: 93,
  },
  {
    name: "Running Shoes",
    description: "Lightweight running shoes with advanced cushioning and breathable mesh upper.",
    price: 4999,
    image: "https://m.media-amazon.com/images/I/51+dzO+haUL._UY900_.jpg",
    category: "Sports",
    stock: 40,
    rating: 4.6,
    numReviews: 178,
  },
  {
    name: "Coffee Maker",
    description: "Programmable coffee maker with thermal carafe and auto-brew feature.",
    price: 6999,
    image: "https://m.media-amazon.com/images/I/811QsTBqYvL.jpg",
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
