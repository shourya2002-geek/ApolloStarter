require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI_TEST, { useNewUrlParser: true });