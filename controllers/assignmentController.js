// controllers/assignmentController.js
const Assignment = require('../models/Assignment');

exports.getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ admin: req.user._id })
      .populate('userId', 'username')
      .select('userId task createdAt status');
    res.json(assignments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.acceptAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findOneAndUpdate(
      { _id: req.params.id, admin: req.user._id },
      { status: 'accepted' },
      { new: true }
    );
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    res.json({ message: 'Assignment accepted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.rejectAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findOneAndUpdate(
      { _id: req.params.id, admin: req.user._id },
      { status: 'rejected' },
      { new: true }
    );
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    res.json({ message: 'Assignment rejected successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};