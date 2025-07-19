// /models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userRole:{ type:['Admin', 'User'], default:'User'},
  username: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true }, // should be hashed
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
