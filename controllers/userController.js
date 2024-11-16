// controllers/userController.js
const User = require('../models/User');
const Assignment = require('../models/Assignment');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'An error occurred during registration' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, userId: user._id, role: user.role });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
};

exports.uploadAssignment = async (req, res) => {
  try {
    const { task, admin } = req.body;
    if (!task || !admin) {
      return res.status(400).json({ error: 'Task and admin are required' });
    }
    const assignment = new Assignment({ userId: req.user._id, task, admin });
    await assignment.save();
    res.status(201).json({ message: 'Assignment uploaded successfully', assignmentId: assignment._id });
  } catch (error) {
    console.error('Upload assignment error:', error);
    res.status(500).json({ error: 'An error occurred while uploading the assignment' });
  }
};

exports.getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: 'admin' }, 'username _id');
    res.json(admins);
  } catch (error) {
    console.error('Get admins error:', error);
    res.status(500).json({ error: 'An error occurred while fetching admins' });
  }
};