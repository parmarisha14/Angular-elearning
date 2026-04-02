const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

const routes = require('./routes/index');
app.use('/api', routes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});