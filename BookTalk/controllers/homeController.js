const { getAll } = require('../services/bookService');

const homeController = require('express').Router()
//TODO да се замени с реалния контролер от задачата
homeController.get('/', (req, res) => {
    res.render('home', {
        title: 'Home page',
        user: req.user
    });
});

homeController.get('/catalog', async (req, res) => {
    const books = await getAll()
    res.render('catalog', {
        title: 'Catalog Page',
        books
    })
});
homeController.get('/error', (req, res) => {
    res.render('404', {
        title: 'Error 404'
    });
});

module.exports = homeController