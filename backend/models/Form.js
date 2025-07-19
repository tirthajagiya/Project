const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionId: { type: String, required: true },
  label: { type: String },
  type: { type: String },
  description: { type: String }, // for titleAndDescription
  isRequired: { type: Boolean },
  options: [String],
  Validation: {
    isValidated: { type: Boolean, default: false },
    validation: mongoose.Schema.Types.Mixed
  }
}, { _id: false });

const formSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  description: String,
  questions: [questionSchema]
}, { timestamps: true });

module.exports = mongoose.model('Form', formSchema);
