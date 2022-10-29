const searchController = require('express').Router()
const { hasUser } = require('../middlewares/guards');
const { getAllByName } = require('../services/cryptoService');


searchController.get('/',hasUser(), async (req, res) => {
    let cryptos =[]
    cryptos = await getAllByName(req.query.search,req.query.type)
    res.render('search', {
        title: 'Search page',
        cryptos,
        search: req.query.search
    });
});

module.exports = searchController