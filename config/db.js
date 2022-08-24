// Mongoose setup.
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

module.exports = mongoose;