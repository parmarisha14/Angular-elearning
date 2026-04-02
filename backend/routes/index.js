const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
const contactRoutes = require('./contact.routes');
router.use('/user', userRoutes);
router.use('/contact', contactRoutes);
module.exports = router;