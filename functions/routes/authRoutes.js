const express = require('express');
const { registerUser, verifyToken } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/verify-token', verifyToken);

module.exports = router;
