const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/user.controller');
const upload = require('../middleware/upload');

// AUTH
router.post('/register', ctrl.register);
router.post('/login', ctrl.login);

// PROFILE
router.get('/profile/:id', ctrl.getProfile);

// ✅ IMAGE SUPPORT
router.put('/profile/:id', upload.single('image'), ctrl.updateProfile);

// PASSWORD
router.put('/change-password/:id', ctrl.changePassword);

module.exports = router;