function hasUser(){
    return (req,res,next) =>{
        if(req.user){
            next()
        }else{
            res.render('/')
        }
    };
};

function isGuest(){
    if(!req.user) {
        next();
    } else {
        res.redirect('/');
    }
};

module.exports = {
    hasUser, isGuest
}