const profileController = require('express').Router()
const {getAllByUser,getAllByUserFollowings} = require('../services/blogService')
profileController.get('/', async(req, res) => {
    const userBlogs = await getAllByUser(req.user._id)
    const userFollowings = await getAllByUserFollowings(req.user._id)
    res.render('profile',{
        title: 'Profile Page',
        userBlogs,
        userFollowings,
        user: req.user
    })
});
module.exports = profileController