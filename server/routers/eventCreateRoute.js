const express = require('express');
const router = express.Router();
const createEvent = require('../controllers/createEvent');
const wrapAsync = require('../utils/wrapAsync');

router.post('/events', wrapAsync(createEvent));

module.exports = router;