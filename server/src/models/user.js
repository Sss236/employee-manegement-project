const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// for log in credential
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: { // employee or hr
        type: String,
        required: true,
        enum:['employee', 'hr'],
        default: 'employee'
    }
});

userSchema.pre('save', async function (next) {
    try {
      if (!this.isModified('password')) {
        return next();
      }
      let hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
      return next();
    } catch (err) {
      return next(err);
    }
});
  
userSchema.methods.comparePassword = async function (candidatePassword, next) {
    try {
      let isMatched = await bcrypt.compare(candidatePassword, this.password);
      return isMatched;
    } catch (err) {
      return next(err);
    }
};

const User = mongoose.model('User', userSchema);
module.exports = User;