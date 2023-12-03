const express = require('express');
const router = express.Router();
const HeartbeatController = require('../controllers/heartbeat.controller');
const TestsController = require('../controllers/tests.controller');
const SuggestionsController = require('../controllers/suggestions.controller')

router.get('/', HeartbeatController.getHeartbeat);
router.post('/create-test', TestsController.createTest);
router.post('/run-test', TestsController.runTests);
router.post('/get-suggestions', SuggestionsController.getSuggestions);


module.exports = router;