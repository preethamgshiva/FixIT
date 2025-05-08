const Issue = require('../models/Issue');

exports.createIssue = async (req, res) => {
  const { description, lat, lng } = req.body;
  const imageUrl = req.file ? req.file.filename : "";

  const newIssue = new Issue({
    description,
    imageUrl,
    location: { lat, lng }
  });

  await newIssue.save();
  res.status(201).json(newIssue);
};

exports.getAllIssues = async (req, res) => {
  const issues = await Issue.find();
  res.json(issues);
};
