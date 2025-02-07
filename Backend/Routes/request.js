const express = require('express');
const router = express.Router();

const request = require('../Models/request');

router.post("/",async(req,res)=>{
    try{
    const newRequest = {
            name: req.body.name,
            users: req.body.users,
            musicURL: req.body.musicURL,
            price: req.body.price,
            orderId: req.body.orderId,
            orderAmount: req.body.orderAmount,
            currency: req.body.currency
        };
        const savedRequest = await request.create(newRequest);
        res.status(201).json(savedRequest);
    }
    catch(error){
        console.error("Error saving request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.get("/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const data = await request.find({ users: userId });

        if (data.length > 0) {
            return res.status(200).send({ success: true, requests: data });
        } else {
            return res.status(404).send({ success: false, msg: "No requests found" });
        }
    } catch (error) {
        console.error("Error fetching request:", error);
        return res.status(500).send({ success: false, msg: "Error fetching request", error });
    }
});


module.exports = router;