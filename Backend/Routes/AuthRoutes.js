const express = require('express');
const router = express.Router();
const admin = require('../config/firebase.config');
const user = require('../Models/user');

router.get('/login', async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(400).json({ message: "Authorization token is missing" });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(400).json({ message: "Token format is incorrect. Expected: 'Bearer <token>'" });
    }

    try {
        const decodeValue = await admin.auth().verifyIdToken(token);
        if (!decodeValue) {
            return res.status(401).json({ message: "Unauthorized" });
        } else {
            // Check if the user exists in the database
            const userExist = await user.findOne({ "user_id": decodeValue.user_id });
            if (!userExist) {
                newUserData(decodeValue, req, res);
            } else {
                updateNewUserData(decodeValue, req, res);
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

const newUserData = async (decodeValue, req, res) => {
    const newUser = new user({
        name: decodeValue.name,
        email: decodeValue.email,
        imageURL: decodeValue.picture,
        user_id: decodeValue.user_id,
        email_verified: decodeValue.email_verified,
        role: "member",
        auth_time: decodeValue.auth_time
    });

    try {
        const userSaved = await newUser.save();
        res.status(200).send({ user: userSaved });
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
};

const updateNewUserData = async (decodeValue, req, res) => {
    const filter = { user_id: decodeValue.user_id };

    const options = {
        upsert: true,
        new: true
    };

    try {
        const result = await user.findOneAndUpdate(
            filter,
            { auth_time: decodeValue.auth_time },
            options
        );
        res.status(200).send({ user: result });
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
};

router.get('/getAllUsers', async (req, res) => {
    try {
        const users = await user.find();
        res.status(200).send({ users });
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
  });
  
router.delete('/deleteUser/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await user.findByIdAndDelete(id);
        res.status(200).send({ success: true, msg: "User deleted successfully" });
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
});

module.exports = router;
