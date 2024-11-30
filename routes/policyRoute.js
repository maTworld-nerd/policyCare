const express = require('express');
const router = express.Router();
const policyController = require('../controllers/policyController');

router.post('/', policyController.simulatePolicy);

module.exports = router;
