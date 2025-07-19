// app.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Mount user routes
app.use('/api/users', require('./routes/userRoutes'));

// Optional: test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;
