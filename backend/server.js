// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env
dotenv.config();

// Initialize express app
const app = express();

// Global Middleware
app.use(cors());
app.use(express.json()); // To parse application/json
app.use(express.urlencoded({ extended: true })); // To parse form submissions

// Route Imports
const userRoutes = require('./routes/userRoutes');   // For /api/users/register and /api/users/login
const formRoutes = require('./routes/formRoutes');   // For form creation, my-forms, share/:formId

// Mount Routes
app.use('/api/users', userRoutes);   // ⬅️ You were using this route in frontend: /api/users/register
app.use('/api/forms', formRoutes);

// Test API
app.get('/', (req, res) => {
  res.send('✅ API is working');
});

// MongoDB Connection & Server Start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('🔗 MongoDB connected');
    app.listen(5000, () => {
      console.log('🚀 Server running on http://localhost:5000');
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });
