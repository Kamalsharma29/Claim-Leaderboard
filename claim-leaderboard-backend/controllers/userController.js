const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.addUser = async (req, res) => {
  const { name } = req.body;
  const user = await User.create({ name });
  res.json(user);
};

exports.claimPoints = async (req, res) => {
  const userId = req.params.userId;
  const points = Math.floor(Math.random() * 10) + 1;

  const user = await User.findById(userId);
  user.totalPoints += points;
  await user.save();

  const history = await ClaimHistory.create({ userId, points });

  res.json({ user, points, history });
};

exports.getLeaderboard = async (req, res) => {
  const users = await User.find().sort({ totalPoints: -1 });
  res.json(users);
};

exports.getHistory = async (req, res) => {
  const userId = req.params.userId;
  const history = await ClaimHistory.find({ userId }).sort({ claimedAt: -1 });
  res.json(history);
};
