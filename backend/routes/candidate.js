const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');
const { protect, authorize } = require('../middleware/authMiddleware');

// Get all candidates
router.get('/', protect, async (req, res) => {
  try {
    const candidates = await Candidate.find({});
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create candidate (for testing purposes or initial data)
router.post('/', protect, authorize('RECRUITER'), async (req, res) => {
  const { name, email, education, experience } = req.body;
  try {
    const candidate = await Candidate.create({ name, email, education, experience });
    res.status(201).json(candidate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update candidate status
// Business Rule: APPLIED -> SHORTLISTED -> REJECTED
router.put('/:id/status', protect, authorize('RECRUITER'), async (req, res) => {
  const { status } = req.body;
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });

    const currentStatus = candidate.status;
    const allowedTransitions = {
      'APPLIED': ['SHORTLISTED'],
      'SHORTLISTED': ['REJECTED'],
      'REJECTED': [] // Final state
    };

    if (!allowedTransitions[currentStatus].includes(status)) {
      return res.status(400).json({ 
        message: `Invalid status transition from ${currentStatus} to ${status}. Only APPLIED -> SHORTLISTED -> REJECTED is allowed.` 
      });
    }

    candidate.status = status;
    await candidate.save();
    res.json(candidate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
