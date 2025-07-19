const express = require('express');
const multer = require('multer');
const router = express.Router();
const Form = require('../models/Form');
const FormResponse = require('../models/FormResponse');
const verifyToken = require('../middleware/authMiddleware');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', verifyToken, upload.any(), async (req, res) => {
  try {
    const { name, description, questions } = req.body;

    const form = new Form({
      userId: req.user.id,
      name,
      description,
      questions: JSON.parse(questions)
    });

    await form.save();
    res.status(201).json({ message: 'Form created successfully', form });
  } catch (err) {
    console.error('❌ Form creation error:', err.message);
    res.status(500).json({ message: 'Error creating form' });
  }
});

router.get('/my-forms', verifyToken, async (req, res) => {
  try {
    const forms = await Form.find({ userId: req.user.id }).select('name description _id createdAt');
    res.status(200).json(forms);
  } catch (err) {
    console.error('❌ Error fetching forms:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/share/:formId', async (req, res) => {
  try {
    const form = await Form.findById(req.params.formId).select('-userId');
    if (!form) return res.status(404).json({ message: 'Form not found' });
    res.status(200).json(form);
  } catch (err) {
    console.error('❌ Error fetching shared form:', err.message);
    res.status(500).json({ message: 'Error fetching form' });
  }
});

router.post('/share/:formId/submit', async (req, res) => {
  try {
    const { responses } = req.body;

    if (!responses || typeof responses !== 'object') {
      return res.status(400).json({ message: 'Invalid or empty response data' });
    }

    const form = await Form.findById(req.params.formId);
    if (!form) return res.status(404).json({ message: 'Form not found' });

    const formatted = Object.entries(responses).map(([questionId, answer]) => ({
      questionId,
      answer
    }));

    const formResponse = new FormResponse({
      formId: form._id,
      response: formatted
    });

    await formResponse.save();
    res.status(201).json({ message: 'Response submitted successfully' });
  } catch (err) {
    console.error('❌ Error submitting form response:', err.message);
    res.status(500).json({ message: 'Error submitting form' });
  }
});

router.get('/:formId/responses', verifyToken, async (req, res) => {
  try {
    const form = await Form.findById(req.params.formId);
    if (!form) return res.status(404).json({ message: 'Form not found' });

    if (form.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const responses = await FormResponse.find({ formId: req.params.formId });
    res.status(200).json(responses);
  } catch (err) {
    console.error('❌ Error fetching form responses:', err.message);
    res.status(500).json({ message: 'Error fetching responses' });
  }
});

module.exports = router;
