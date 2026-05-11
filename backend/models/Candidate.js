const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  education: { type: String, required: true },
  experience: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['APPLIED', 'SHORTLISTED', 'REJECTED'], 
    default: 'APPLIED' 
  },
}, { timestamps: true });

module.exports = mongoose.model('Candidate', CandidateSchema);
