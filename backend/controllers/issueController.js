const Issue = require('../models/Issue');

exports.createIssue = async (req, res) => {
  try {
    console.log('Received issue submission:', req.body);
    console.log('File:', req.file);

    const { description, lat, lng } = req.body;
    const imageUrl = req.file ? req.file.filename : "";

    console.log('Creating new issue with:', { description, imageUrl, location: { lat, lng } });

    const newIssue = new Issue({
      description,
      imageUrl,
      location: { lat, lng }
    });

    const savedIssue = await newIssue.save();
    console.log('Issue saved successfully:', savedIssue);

    res.status(201).json(savedIssue);
  } catch (error) {
    console.error('Error creating issue:', error);
    res.status(500).json({ message: 'Error creating issue', error: error.message });
  }
};

exports.getAllIssues = async (req, res) => {
  try {
    console.log('Fetching all issues');
    const issues = await Issue.find();
    console.log(`Found ${issues.length} issues`);
    res.json(issues);
  } catch (error) {
    console.error('Error fetching issues:', error);
    res.status(500).json({ message: 'Error fetching issues', error: error.message });
  }
};
