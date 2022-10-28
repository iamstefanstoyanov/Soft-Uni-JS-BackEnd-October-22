const { getByUserWishes } = require('../services/bookService');

const profileController = require('express').Router();

profileController.get('/',async (req, res) => {
    const wished = await getByUserWishes(req.user._id)
    res.render('profile', {
        title: 'Profile Page',
        user: Object.assign({wished}, req.user)
    })
})

module.exports = profileController