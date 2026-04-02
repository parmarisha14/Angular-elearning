const User = require('../models/user.model');

// REGISTER
exports.register = async (req, res) => {
  try {
    const exist = await User.findOne({ email: req.body.email });

    if (exist) {
      return res.json({ success: false, message: 'Email already exists' });
    }

    const user = new User(req.body);
    await user.save();

    res.json({ success: true });
  } catch {
    res.json({ success: false });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password
  });

  if (!user) {
    return res.json({ success: false });
  }

  res.json({ success: true, user });
};

// GET PROFILE
exports.getProfile = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
};

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.json({ success: true });
};

// CHANGE PASSWORD
exports.changePassword = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user.password !== req.body.oldPassword) {
    return res.json({ success: false });
  }

  user.password = req.body.newPassword;
  await user.save();

  res.json({ success: true });
};