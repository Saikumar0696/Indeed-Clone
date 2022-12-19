const express = require('express');
const { sendMessage, getMessages, replyMessage, getDistinctEmployer } = require('../controllers/MessageController')

const router = express.Router();

router.route('/send-message').post(sendMessage);

router.route('/reply-message').put(replyMessage);

router.route('/conversation').get(getMessages);

router.route('/distinct-employers').get(getDistinctEmployer)

module.exports = router;