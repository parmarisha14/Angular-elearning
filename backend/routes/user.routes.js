const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/user.controller');

router.post('/register', ctrl.register);
router.post('/login', ctrl.login);

router.get('/profile/:id', ctrl.getProfile);
router.put('/profile/:id', ctrl.updateProfile);
router.put('/change-password/:id', ctrl.changePassword);

module.exports = router;