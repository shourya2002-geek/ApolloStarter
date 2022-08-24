const mongoose = require('mongoose');
const { isEmail } = require('validator');

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      validate: {
        validator: isEmail,
        message: '{VALUE} is not a valid email'
      }
    },
    authRefreshToken: String,
    passwordResetToken: String,
    passwordResetExpires: String
  },
  {
    timestamps: true,
    versionKey: false
  }
);

schema.virtual('id').get(function() {
  return this._id;
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);