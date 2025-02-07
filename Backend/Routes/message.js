const express = require('express');
const router = express.Router();
const { sendMessages } = require('../Controllers/messageControllers');
const { protect } = require('../Middleware/userMiddleware');
const { allMessages } = require('../Controllers/messageControllers');


router.post('/', protect, sendMessages);
router.get('/:chatId', protect, allMessages);

module.exports = router;