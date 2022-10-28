const { register, login } = require('../services/userService');
const { parseError } = require('../util/parser');
const authController = require('express').Router();
const validator = require('validator')

authController.get('/register', (req, res) => {
  //TODO да се замени register view според задачата
  res.render('register', {
    title: 'Register Page',
  });
});

authController.post('/register', async (req, res) => {
  try {
    if(validator.isEmail(req.body.email)==false){
      throw new Error('Invalid email');
    }
    if (req.body.username == '' || req.body.password == '') {
      throw new Error('All fields are required!');
    }
    if (req.body.email.length < 10) {
      throw new Error('The email should be at least 10 characters long');
    }
    if (req.body.password != req.body.repass) {
      throw new Error('Passwords don\'t match!');
    }
    if (req.body.username.length < 4) {
      throw new Error('The username should be at least 4 characters long');
    }
    if (req.body.password.length < 3) {
      throw new Error('The password should be at least 3 characters long');
    }
    const token = await register(req.body.email,req.body.username, req.body.password);
    //TODO да проверя в задачата дали регистър съсзава сесия
    res.cookie('token', token);

    res.redirect('/'); // TODO да се провери къде ни пренасочва според задачата
  } catch (error) {
    console.log(error)
    const errors = parseError(error);
    //TODO да се добави ерор грешката от реалната задача
    res.render('register', {
      title: 'Register Page',
      errors,
      body: {
        email: req.body.email,
        username: req.body.username,
      },
    });
  }
});

authController.get('/login', (req, res) => {
  //TODO да се замени логин view според задачата
  res.render('login', {
    title: 'Login Page',
  });
});
authController.post('/login', async (req, res) => {
  try {
    const token = await login(req.body.email, req.body.password);
    res.cookie('token', token);
    res.redirect('/'); // TODO да се провери къде ни пренасочва според задачата
  } catch (error) {
    const errors = parseError(error);
    //TODO да се добави ерор грешката от реалната задача
    res.render('login', {
      title: 'Login Page',
      errors,
      body: {
        email: req.body.email,
      },
    });
  }
});

authController.get('/logout',(req,res)=>{
  res.clearCookie('token');
  res.redirect('/');
})
module.exports = authController;
