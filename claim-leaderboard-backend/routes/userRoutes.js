const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

// ✅ GET /api/users - fetch all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ POST /api/claim/:userId - claim random points for a user
router.post('/claim/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Generate random points between 1 and 10
    const points = Math.floor(Math.random() * 10) + 1;

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user's points
    user.totalPoints += points;
    await user.save();

    // Log the claim history
    const claim = new ClaimHistory({ userId, points });
    await claim.save();

    res.json({
      message: "Points claimed successfully",
      points,
      user,
    });
  } catch (err) {
    console.error("Error in claimPoints:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ POST /api/reset - reset all users' totalPoints to 0
router.post('/reset', async (req, res) => {
  try {
    await User.updateMany({}, { $set: { totalPoints: 0 } });
    res.json({ message: "All user points have been reset to 0." });
  } catch (err) {
    console.error("Error resetting user points:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;


