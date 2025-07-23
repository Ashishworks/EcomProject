import express from "express"
import Order from "../models/Order.js"
import auth from "../middleware/auth.js"

const router = express.Router()

// Create order
router.post("/create", auth, async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress } = req.body

    const order = new Order({
      user: req.user._id,
      items,
      totalAmount,
      shippingAddress,
    })

    await order.save()
    await order.populate("items.product")

    res.status(201).json({ message: "Order created successfully", order })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Get user orders
router.get("/my-orders", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("items.product").sort({ createdAt: -1 })

    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Get order by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate("items.product")

    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    res.json(order)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Update order status
router.put("/:id/status", auth, async (req, res) => {
  try {
    const { status } = req.body

    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { status },
      { new: true },
    ).populate("items.product")

    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    res.json({ message: "Order status updated", order })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

export default router
