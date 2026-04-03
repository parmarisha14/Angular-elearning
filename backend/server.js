const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// DB CONNECT
connectDB();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ✅ IMAGE ACCESS (IMPORTANT)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ROUTES
const routes = require('./routes/index');
app.use('/api', routes);

// SERVER
app.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
});