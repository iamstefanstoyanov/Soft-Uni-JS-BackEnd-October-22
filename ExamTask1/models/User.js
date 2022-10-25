const { Schema, model } = require('mongoose');
//TODO според задачата задавам критерии
const userSchema = new Schema({
  email: { 
    type: String, 
    required: true, 
    unique:true},
  hashedPassword: { 
    type: String, 
    required: true },
  username: { 
    type: String, 
    required: true, 
    unique: true, 
    match: [/^[a-zA-Z0-9]+$/i, 'Username may contain only letters and numbers'] },
  
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
