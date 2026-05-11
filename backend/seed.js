const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Candidate = require('./models/Candidate');

dotenv.config();

const candidates = [
  {
    name: "John Doe",
    email: "john@example.com",
    education: "B.Tech Computer Science",
    experience: "2 years as Frontend Dev",
    status: "APPLIED"
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    education: "M.Sc Data Science",
    experience: "3 years as Data Analyst",
    status: "SHORTLISTED"
  },
  {
    name: "Robert Brown",
    email: "robert@example.com",
    education: "MBA",
    experience: "5 years as Product Manager",
    status: "REJECTED"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Candidate.deleteMany({});
    await Candidate.insertMany(candidates);
    console.log('Database Seeded Successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
