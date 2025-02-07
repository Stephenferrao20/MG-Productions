const express = require('express');
const router = express.Router();
const requestModel = require("../Models/request"); 
const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


router.post("/create-order", async (req, res) => {
    try {

        const options = {
            amount: req.body.price, 
            currency: "INR",
        };

        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error("Order creation error:", error);
        res.status(500).json({ error: "Failed to create order",
            error_msg:error
         });
    }
});

router.post("/verify-payment", async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, requestId } = req.body;

        console.log("verify-payment received:", req.body); 

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !requestId) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
                                        .update(sign)
                                        .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ success: false, message: "Invalid signature" });
        }

        await requestModel.findByIdAndUpdate(requestId, { isPaid: true });
        res.json({ success: true, paymentId: razorpay_payment_id });

    } catch (error) {
        console.error("Payment verification error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
