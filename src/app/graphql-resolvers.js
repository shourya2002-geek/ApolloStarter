const merge = require('lodash.merge');

const AuthResolvers = require('../auth/auth-resolvers');
const UserResolvers = require('../user/user-resolvers');

module.exports = merge(AuthResolvers, UserResolvers);