const { Schema, model } = require('mongoose');
//TODO според задачата задавам критерии
const userSchema = new Schema({
  username: { type: String, required: true, unique: true,minlength: [2, 'Username should be at least 2 characters']},
  email: { type: String, required: true, unique: true,minlength: [10, 'Email should be at least 10 characters']},
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
userSchema.index(
  { email: 1 },
  {
    collation: {
      locale: 'en',
      strength: 2,
    },
  }
);
const User = model('User', userSchema);
module.exports = User;
