const { getAll } = require('../services/blogService');

const homeController = require('express').Router()
//TODO да се замени с реалния контролер от задачата
homeController.get('/', async (req, res) => {
    const blogs = await getAll()
    console.log(blogs)
    res.render('home', {
        title: 'Home page',
        blogs
    });
});
module.exports = homeController