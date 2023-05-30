const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3000;
// const port = process.env || 3000;

app.use(bodyParser.json());

app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
