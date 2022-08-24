const User = require('./user-model');

module.exports = {
  Query: {
    me: (_, __, ctx) => ctx.user || null
  }
};