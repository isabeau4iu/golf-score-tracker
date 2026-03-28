// Load environment variables from .env file into process.env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

// Initialise the Express application
const app = express();

// Enable cross-origin Resource Sharing so the React frontend can communicate with this backend
app.use(cors());

// Parse incoming JSON request bodies
app.use(express.json());

// import route modules for each resource domain
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const roundRoutes = require('./routes/rounds');
const courseRoutes = require('./routes/courses');

// Register routes with their respective base paths
app.use('/api/auth', authRoutes);       // Authentication: register, login
app.use('/api/users', userRoutes);      // User profile management
app.use('/api/rounds', roundRoutes);    // Golf round logging and history
app.use('/api/courses', courseRoutes);  // Golf course data

// Test route to verify the API is reachable
app.get('/api', (req, res) => {
  res.json({ message: 'Golf Score Tracker API is running!' });
});

// Health check endpoint used by Render in order to confirm the service is alive
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Connect to MongoDB Atlas and start the server only after a successful connection has been established
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    // Log the error and exit if the database connection fails
    console.error('MongoDB connection error:', err);
  });