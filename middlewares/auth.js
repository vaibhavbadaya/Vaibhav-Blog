const {validateToken} = require('../services/auth');

function checkAuth(cookiename){
    return (req, res, next) => {
        const tokenCookie = req.cookies[cookiename];
        if (!tokenCookie) {
            return next();
        }
        try {
            const userPayload = validateToken(tokenCookie);
            req.user = userPayload;
            return next();
        } catch (error) {
            return next();
        }
    } 
}   



module.exports = {
    checkAuth
}