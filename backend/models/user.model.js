// models/user.model.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: String,
  phone: String,
  email: { type: String, unique: true },
  password: String,

  gender: { type: String, default: '' },
  dob: { type: String, default: '' },
  address: { type: String, default: '' },

  image: {
    type: String,
    default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
  },

  role: { type: String, default: 'user' }
});

module.exports = mongoose.model('User', userSchema);