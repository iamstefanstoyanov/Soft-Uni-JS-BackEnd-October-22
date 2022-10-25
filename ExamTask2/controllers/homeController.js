const { getAllByDate, getRecent } = require('../services/courseService');

const homeController = require('express').Router()

//TODO да се замени с реалния контролер от задачата
homeController.get('/', async (req, res) => {
    let view
    let courses =[]
    if(req.user){
        view= 'userhome';
        courses = await getAllByDate(req.query.search)
    }else{
        view= 'guesthome'
        courses = await getRecent()
    }
    res.render(view, {
        title: 'Home page',
        courses,
        search: req.query.search
    });
});
module.exports = homeController