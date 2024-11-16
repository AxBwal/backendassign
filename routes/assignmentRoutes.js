// routes/assignmentRoutes.js
const express = require('express');
const { getAssignments, acceptAssignment, rejectAssignment } = require('../controllers/assignmentController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticate, authorizeAdmin, getAssignments);
router.post('/:id/accept', authenticate, authorizeAdmin, acceptAssignment);
router.post('/:id/reject', authenticate, authorizeAdmin, rejectAssignment);

module.exports = router;