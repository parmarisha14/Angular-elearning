const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');

router.post('/submit', contactController.submitContact);
router.get('/all', contactController.getAllContacts); // Admin route

module.exports = router;