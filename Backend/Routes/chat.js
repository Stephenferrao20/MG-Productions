const express = require('express');
const router = express.Router();
const { accessChat  , fetchChats } = require('../Controllers/chatControllers'); 

router.route('/').post(accessChat); 
router.route('/').get(fetchChats);

module.exports = router;
