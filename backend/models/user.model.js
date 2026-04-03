const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, default: '' },

  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  gender: { type: String, default: '' },
  dob: { type: String, default: '' },
  address: { type: String, default: '' },

  image: {
    type: String,
    default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
  },

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);