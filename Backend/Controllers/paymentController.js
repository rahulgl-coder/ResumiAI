const Razorpay = require('razorpay');
const crypto = require('crypto');
const { log } = require('console');

require('dotenv').config

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Create order
const createOrder= async (req, res) => {
  try {
    const options = {
      amount: 50000, // 500 INR
      currency: "INR",
      receipt: "receipt#1",
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ msg: "Error creating Razorpay order", error });
  }
}

// Verify payment
 const verifyPayment=async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    

    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === razorpay_signature) {
      await User.findByIdAndUpdate(req.user.id, { hasPaid: true });
      res.json({ msg: "Payment successful, features unlocked" });
    } else {
      res.status(400).json({ msg: "Payment verification failed" });
    }
  } catch (error) {
 res.status(500).json({ msg: "Error verifying payment", error });
  }
};


module.exports={createOrder,verifyPayment}