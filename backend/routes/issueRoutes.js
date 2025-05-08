const express = require('express');
const router = express.Router();
const multer = require('multer');
const Issue = require('../models/Issue'); // ✅ Make sure this path is correct
const { createIssue, getAllIssues } = require('../controllers/issueController');

const upload = multer({ dest: 'uploads/' });

// POST /api/issues
router.post('/', upload.single('image'), createIssue);

// GET /api/issues
router.get('/', getAllIssues);

// DELETE /api/issues/:id ✅ THIS MUST BE INSIDE router
router.delete('/:id', async (req, res) => {
  try {
    const issue = await Issue.findByIdAndDelete(req.params.id);
    if (!issue) {
      return res.status(404).json({ error: 'Issue not found' });
    }
    res.json({ message: 'Issue deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete issue' });
  }
});

module.exports = router;
