const homeController = require('express').Router()
//TODO да се замени с реалния контролер от задачата
homeController.get('/', (req, res) => {
    res.render('home', {
        title: 'Home page',
        user: req.user
    });
});
module.exports = homeController