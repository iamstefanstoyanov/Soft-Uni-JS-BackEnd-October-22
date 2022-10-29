const authController  = require('../controllers/authController')
const homeController  = require('../controllers/homeController')
const cryptoController  = require('../controllers/cryptoController')
const searchController = require('../controllers/searchController')

module.exports = (app) => {
    app.use('/', homeController)
    app.use('/auth', authController)
    
    app.use('/cryptos', cryptoController)

    app.use('/search', searchController)



}