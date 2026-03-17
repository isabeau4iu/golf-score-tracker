const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const roundRoutes = require('./routes/rounds');
const courseRoutes = require('./routes/courses');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/rounds', roundRoutes);
app.use('/api/courses', courseRoutes);

// Test route
app.get('/api', (req, res) => {
  res.json({ message: 'Golf Score Tracker API is running!' });
});

app.get("/health", (req, res) => res.json({ status: "ok" }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
