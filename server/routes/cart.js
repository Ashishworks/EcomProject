import express from "express"
import User from "../models/User.js"
import Product from "../models/Product.js"
import auth from "../middleware/auth.js"

const router = express.Router()

// Get cart items
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart.product")
    res.json(user.cart)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Add item to cart
router.post("/add", auth, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body

    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    const user = await User.findById(req.user._id)
    const existingItem = user.cart.find((item) => item.product.toString() === productId)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      user.cart.push({ product: productId, quantity })
    }

    await user.save()
    await user.populate("cart.product")

    res.json({ message: "Item added to cart", cart: user.cart })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Update cart item quantity
router.put("/update", auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body

    const user = await User.findById(req.user._id)
    const cartItem = user.cart.find((item) => item.product.toString() === productId)

    if (!cartItem) {
      return res.status(404).json({ message: "Item not found in cart" })
    }

    if (quantity <= 0) {
      user.cart = user.cart.filter((item) => item.product.toString() !== productId)
    } else {
      cartItem.quantity = quantity
    }

    await user.save()
    await user.populate("cart.product")

    res.json({ message: "Cart updated", cart: user.cart })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Remove item from cart
router.delete("/remove/:productId", auth, async (req, res) => {
  try {
    const { productId } = req.params

    const user = await User.findById(req.user._id)
    user.cart = user.cart.filter((item) => item.product.toString() !== productId)

    await user.save()
    await user.populate("cart.product")

    res.json({ message: "Item removed from cart", cart: user.cart })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Clear cart
router.delete("/clear", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    user.cart = []
    await user.save()

    res.json({ message: "Cart cleared", cart: [] })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

export default router
