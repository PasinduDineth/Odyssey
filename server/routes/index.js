const express = require('express');
const router = express.Router();
const HeartbeatController = require('../controllers/heartbeat.controller');
const TestsController = require('../controllers/tests.controller');

router.get('/', HeartbeatController.getHeartbeat);
router.post('/create-test', TestsController.createTest);

module.exports = router;