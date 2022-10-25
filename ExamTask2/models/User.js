const { Schema, model } = require('mongoose');
//TODO според задачата задавам критерии
const userSchema = new Schema({
  username: { type: String, required: true, unique: true, minlength:[5, 'Username must be at least 5 char long']},
  hashedPassword: { type: String, required: true },
});
userSchema.index(
  { username: 1 },
  {
    collation: {
      locale: 'en',
      strength: 2,
    },
  }
);
const User = model('User', userSchema);
module.exports = User;
