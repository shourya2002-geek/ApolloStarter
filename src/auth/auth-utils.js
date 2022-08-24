const crypto = require('crypto');
const { hash } = require('bcrypt');
const { sign, verify } = require('jsonwebtoken');
const User = require('../user/user-model');

const CONFIG = {
  jwtTokenLife: '30 days',
  jwtRefreshTokenLife: '30 days',
  jwtIssuer: 'myapp:api',
  jwtAudience: 'myapp:user',
  jwtTokenSubject: 'user:auth-token',
  jwtRefreshTokenSubject: 'user:auth-refresh-token'
};

const createAuthToken = (userId = '') => {
  return sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: CONFIG.jwtTokenLife,
    audience: CONFIG.jwtAudience,
    issuer: CONFIG.jwtIssuer,
    subject: CONFIG.jwtTokenSubject
  });
};

const createAuthRefreshToken = async (userId = '') => {
  const authRefreshToken = sign({ userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: CONFIG.jwtRefreshTokenLife,
    audience: CONFIG.jwtAudience,
    issuer: CONFIG.jwtIssuer,
    subject: CONFIG.jwtRefreshTokenSubject
  });

  User.updateOne({ _id: userId }, { authRefreshToken });
  return authRefreshToken;
};

const getAuthRefreshToken = (userId = '') => {
  const { authRefreshToken } = User.findOne({ _id: userId }).select(
    'authRefreshToken -_id'
  );
  return authRefreshToken;
};

const getAuthTokenFromHeaders = (headers = {}) => {
  // Check if authorization header is present.
  const bearerToken = headers.authorization || null;
  if (!bearerToken) return null;
  // Get token from header -  "Authorization: Bearer <token>".
  return bearerToken.split('Bearer ')[1];
};

const verifyAuthToken = async (authToken = '') => {
  try {
    const { userId } = verify(authToken, process.env.JWT_SECRET);
    if (!userId) return null;

    // Find current user.
    const user = await User.findOne({ _id: userId });

    return user;
  } catch (e) {
    if (e.name !== 'TokenExpiredError') throw new Error(e.message);

    throw new Error(e.message);
    // TODO:
    // Get auth refresh token.
    // See if it expired.
    // If not, create a new auth token and send back

    // const {
    //   payload: { userId }
    // } = decode(authToken, process.env.JWT_SECRET);

    // const { authRefreshToken } = User.findOne({ _id: userId }).select(
    //   'authRefreshToken -_id'
    // );
  }
};

const getUserFromToken = async (authToken = '') => {
  const { userId } = verify(authToken, process.env.JWT_SECRET);
  if (!userId) return null;

  const user = await User.findOne({ _id: userId });

  return user;
};

const getPasswordFromString = (password = '') => {
  return crypto
    .Hash('sha256')
    .update(password)
    .digest('hex');
};

const hashPassword = (password = '') => {
  const passwordSha256 = getPasswordFromString(password);
  return hash(passwordSha256, 10);
};

module.exports = {
  createAuthToken,
  createAuthRefreshToken,
  getAuthTokenFromHeaders,
  getAuthRefreshToken,
  getPasswordFromString,
  getUserFromToken,
  hashPassword,
  verifyAuthToken
};