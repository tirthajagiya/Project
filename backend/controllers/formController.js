const Form = require('../models/Form');

// Create a new form
exports.createForm = async (req, res) => {
  try {
    const { name, description, questions } = req.body;
    const form = await Form.create({
      userId: req.user._id,
      name,
      description,
      questions: JSON.parse(questions),
    });
    res.status(201).json(form);
  } catch (error) {
    console.error('❌ Form creation error:', error.message);
    res.status(500).json({ message: 'Error creating form' });
  }
};

// Get all forms created by logged-in user
exports.getMyForms = async (req, res) => {
  try {
    const forms = await Form.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ forms });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching forms' });
  }
};
