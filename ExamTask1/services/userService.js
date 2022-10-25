const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'qiadsuuqdiwbiwnqrf23';

async function register(email ,username, password) {
    const existingUsername = await User.findOne({ username }).collation({ locale: 'en', strength: 2 })
    if (existingUsername) {
        throw new Error('Username is taken!')
    }
    const existingEmail = await User.findOne({ email }).collation({ locale: 'en', strength: 2 })
    if (existingEmail) {
        throw new Error('Eamil is taken!')
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        username,
        hashedPassword
    });

    //TODO  да погледна в задачата дали се създава usersession при регистрация???
    return createSession(user)
}

async function login(email, password) {
    const user = await User.findOne({ email }).collation({ locale: 'en', strength: 2 })
    if (!user) {
        throw new Error('Incorrect email or password')
    }
    const hasMatch = await bcrypt.compare(password, user.hashedPassword)
    if (hasMatch == false) {
        throw new Error('Incorrect email or password')
    }
    return createSession(user)

}

function createSession({ _id, email, username }) {
    const payload = {
        _id,
        email,
        username
    }
    return jwt.sign(payload, JWT_SECRET);
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET)
}

module.exports = {
    register,
    login,
    verifyToken,
};
