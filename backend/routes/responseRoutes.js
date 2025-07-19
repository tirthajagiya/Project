const express = require('express');
const router = express.Router();
const { submitResponse, getResponses } = require('../controllers/responseController');
const { authenticateUser } = require('../middleware/authMiddleware');

router.post('/:formId', submitResponse);
router.get('/:formId', authenticateUser, getResponses);

module.exports = router;
