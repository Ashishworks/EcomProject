import express from "express"
import Razorpay from "razorpay"
import crypto from "crypto"
import Order from "../models/Order.js"
import User from "../models/User.js"
import auth from "../middleware/auth.js"

const router = express.Router()

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_1234567890",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "test_secret_key",
})

// Create Razorpay order
router.post("/create-order", auth, async (req, res) => {
  try {
    const { amount, currency = "INR" } = req.body

    const options = {
      amount: amount * 100, // amount in smallest currency unit
      currency,
      receipt: `receipt_${Date.now()}`,
    }

    const razorpayOrder = await razorpay.orders.create(options)

    res.json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    })
  } catch (error) {
    res.status(500).json({ message: "Error creating payment order", error: error.message })
  }
})

// Verify payment
router.post("/verify", auth, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "test_secret_key")
      .update(body.toString())
      .digest("hex")

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" })
    }

    // Update order status
    const order = await Order.findOneAndUpdate(
      { _id: orderId, user: req.user._id },
      {
        status: "paid",
        paymentId: razorpay_payment_id,
        razorpayOrderId: razorpay_order_id,
      },
      { new: true },
    )

    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    // Clear user's cart
    await User.findByIdAndUpdate(req.user._id, { cart: [] })

    res.json({
      message: "Payment verified successfully",
      order,
      paymentId: razorpay_payment_id,
    })
  } catch (error) {
    res.status(500).json({ message: "Payment verification failed", error: error.message })
  }
})

export default router
