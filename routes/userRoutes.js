// routes/userRoutes.js
const express = require('express');
const { register, login, uploadAssignment, getAdmins } = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/upload', authenticate, uploadAssignment);
router.get('/admins', authenticate, getAdmins);

module.exports = router;