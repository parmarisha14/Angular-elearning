const User = require('../models/user.model');

// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.json({ success: false, message: 'All fields required' });
    }

    const exist = await User.findOne({ email });

    if (exist) {
      return res.json({ success: false, message: 'Email already exists' });
    }

    const user = new User({
      ...req.body,
      role: 'user'
    });

    await user.save();

    res.json({ success: true, message: 'Registered successfully' });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



// ================= LOGIN =================
exports.login = async (req, res) => {
  try {

    // ✅ ADMIN LOGIN
    if (req.body.email === 'admin@gmail.com' && req.body.password === 'admin123') {
      return res.json({
        success: true,
        user: {
          _id: 'admin-id',
          fullName: 'Admin',
          email: 'admin@gmail.com',
          role: 'admin'
        }
      });
    }

    // ✅ USER LOGIN
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password
    });

    if (!user) {
      return res.json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    res.json({ success: true, user });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



// ================= GET PROFILE =================
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    res.json(user);

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



// ================= UPDATE PROFILE (FIXED) =================
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    let updateData = { ...req.body };

    // ✅ IMAGE HANDLE
    if (req.file) {
      updateData.image = `http://localhost:3000/uploads/${req.file.filename}`;
    }

    // ❌ admin email lock
    if (user.role === 'admin') {
      updateData.email = user.email;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({
      success: true,
      message: 'Profile updated',
      user: updatedUser
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



// ================= CHANGE PASSWORD =================
exports.changePassword = async (req, res) => {
  try {

    // ✅ ADMIN PASSWORD
    if (req.params.id === 'admin-id') {

      if (req.body.oldPassword !== 'admin123') {
        return res.json({ success: false, message: 'Wrong old password' });
      }

      return res.json({
        success: true,
        message: 'Admin password changed (demo)'
      });
    }

    // ✅ USER PASSWORD
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    if (user.password !== req.body.oldPassword) {
      return res.json({ success: false, message: 'Wrong old password' });
    }

    user.password = req.body.newPassword;
    await user.save();

    res.json({ success: true, message: 'Password updated' });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};