const { compareSync } = require('bcrypt');
const User = require('../user/user-model');
const {
  createAuthToken,
  // createAuthRefreshToken,
  hashPassword,
  getPasswordFromString
} = require('./auth-utils');

async function signUp(name = '', email = '', password = '') {
  try {
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const token = createAuthToken(user.id);
    // await createAuthRefreshToken(user.id);

    return { token, user };
  } catch (e) {
    throw new Error('Error on signUp: ', e.message);
  }
}

async function signIn(email = '', password = '') {
  try {
    const user = await User.findOne({ 'emails.address': email });

    if (!user) {
      throw new Error('Wrong email or password.');
    }

    const passwordHash = getPasswordFromString(password);
    const passwordValid = compareSync(passwordHash, user.password);

    if (!passwordValid) {
      throw new Error('Wrong email or password.');
    }

    const token = createAuthToken(user.id);
    // await createAuthRefreshToken(user.id);

    return {
      token,
      userId: user._id
    };
  } catch (e) {
    throw new Error('Error on signIn: ', e.message);
  }
}

async function updatePassword(currentPassword, newPassword, userId) {
  try {
    const user = await User.findById(userId);

    if (newPassword.length < 6) {
      throw new Error('Password must be 6 characters or greater in length.');
    }

    const currentPasswordHash = await getPasswordFromString(currentPassword);
    const currentPasswordValid = compareSync(currentPasswordHash, user.password);

    if (!currentPasswordValid) {
      throw new Error('Current password is incorrect');
    }

    const newPasswordHash = await hashPassword(newPassword);
    user.password = newPasswordHash;
    await user.save();

    return userId;
  } catch (e) {
    throw new Error('Error on updatePassword: ', e.message);
  }
}

module.exports = { signUp, signIn, updatePassword };