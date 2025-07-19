const FormResponse = require('../models/FormResponse');

exports.submitResponse = async (req, res) => {
  try {
    const response = await FormResponse.create({
      formId: req.params.formId,
      response: req.body.response
    });
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getResponses = async (req, res) => {
  try {
    const responses = await FormResponse.find({ formId: req.params.formId });
    res.json(responses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
