const { getAll } = require('../services/hotelService');

const homeController = require('express').Router()
//TODO да се замени с реалния контролер от задачата
homeController.get('/', async (req, res) => {
    const hotels = await getAll();
    res.render('home', {
        title: 'Home page',
        hotels
    });
});


module.exports = homeController