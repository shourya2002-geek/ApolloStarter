const { getAuthTokenFromHeaders, getUserFromToken } = require('../auth/auth-utils');

// Create context object that will be available on each GraphQL resolver.
async function context({ req }) {
  // Set current user if signed in.
  const authToken = getAuthTokenFromHeaders(req.headers);
  if (!authToken) return { user: null };

  const user = await getUserFromToken(authToken);
  // Context object that will be available on GraphQL resolvers.
  return { user };
}

module.exports = context;