const authMiddleware = require("../middlewares/authMiddleware");
const Booking = require("../models/bookingModel");
const Show = require("../models/showModel");
const Razorpay = require("razorpay");
const router = require("express").Router();
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_ID,
});

router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(7),
    });

    res.json(order);
  } catch (error) {
    console.error("Error creating order: ", error);
    res.status(500).json({ error: "Error creating order" });
  }
});

router.post("/verify-order", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET_ID)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generatedSignature !== razorpay_signature) {
    return res.status(400).json({
      message: "Payment verification failed",
      isOk: false,
    });
  }

  // Optional: Update DB here

  res.status(200).json({
    message: "Payment verified successfully",
    isOk: true,
  });
});


router.post("/book-show", authMiddleware, async (req, res) => {
  try {
    // save booking
    const newBooking = new Booking(req.body);
    await newBooking.save();

    const show = await Show.findById(req.body.show);
    // update seats
    await Show.findByIdAndUpdate(req.body.show, {
      bookedSeats: [...show.bookedSeats, ...req.body.seats],
    });

    res.send({
      success: true,
      message: "Show booked successfully",
      data: newBooking,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.get("/get-bookings/", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.body.userId })
      .populate("show")
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "movies",
        },
      })
      .populate("user")
      .populate({
        path: "show",
        populate: {
          path: "theatre",
          model: "theatres",
        },
      });
    res.send({
      success: true,
      message: "Bookings fetched successfully",
      data: bookings,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router; 