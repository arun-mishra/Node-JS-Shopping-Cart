const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    // if (!req.session.isLoggedIn) {
    //     return res.redirect('/login');
    // }

    let decodedToken;
    if(!req.session.token){
       return req.session.destroy(err => {
            console.log(err);
            res.redirect('/');
          });
    }
    try{
        decodedToken = jwt.verify(req.session.token,'#ighlySecureToken')
    }
    catch(error){
        return res.redirect('/login')
    }
    if(!decodedToken){
       return req.session.destroy(err => {
            console.log(err);
            res.redirect('/');
          });
    }
    req.userId = decodedToken.userId
    req.type = decodedToken.type
    next();


}