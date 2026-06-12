const express = require('express');
const router = express.Router();
const getRecommendations = require('../controllers/recommendationController');
const wrapAsync = require('../utils/wrapAsync');

router.get('/recommendations', wrapAsync(getRecommendations));

module.exports = router;
