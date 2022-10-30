const authController  = require('../controllers/authController')
const homeController  = require('../controllers/homeController')
const blogController  = require('../controllers/blogController')
const profileController  = require('../controllers/profileController')


module.exports = (app) => {
    app.use('/', homeController)
    app.use('/auth', authController)
    app.use('/blogs', blogController)
    app.use('/profile', profileController)

}