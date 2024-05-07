const express = require('express');
const router = express.Router();

const { amazonMobiles,amazonSports,amazonStudy } = require('../controllers/controller.js') 

router.get('/fetch/amazon/mobile', amazonMobiles);
router.get('/fetch/amazon/sports', amazonSports);
router.get('/fetch/amazon/study', amazonStudy);

module.exports = router;