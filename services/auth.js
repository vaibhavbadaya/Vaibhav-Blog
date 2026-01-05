const JWT = require("jsonwebtoken");
const User = require("../models/user");

const JWT_SECRET = "$uperman@#2010";

function createTokenUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role
    };
    const token = JWT.sign(payload, JWT_SECRET,
         { expiresIn: '1d' });
    return token;     
}

function validateToken(token) {
    const payload = JWT.verify(token, JWT_SECRET);
    return payload;
}


module.exports ={
    createTokenUser,
    validateToken
}