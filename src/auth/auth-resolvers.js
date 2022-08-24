const { signUp, signIn, updatePassword } = require('./auth-services');

module.exports = {
  Mutation: {
    signUp: (_, { name, email, password }) => signUp(name, email, password),
    signIn: (_, { email, password }) => signIn(email, password),
    updatePassword: (_, { currentPassword, newPassword }, { user: { _id } }) =>
      updatePassword(currentPassword, newPassword, _id)
  }
};