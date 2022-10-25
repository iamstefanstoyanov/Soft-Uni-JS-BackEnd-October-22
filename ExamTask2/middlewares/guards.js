function hasUser(){
    return (req,res,next) =>{
        if(req.user){
            next()
        }else{
            res.redirect('/auth/login');
        }
    };
};

function isGuest(){
    return (req,res,next) =>{
        if(req.user){
            //TODO да погледна накъде да сочи
            res.redirect('/');
        }else{
            next()
        }
    };
};

module.exports = {
    hasUser, isGuest
}