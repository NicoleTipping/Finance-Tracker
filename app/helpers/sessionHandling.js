const res = require('express/lib/response');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const TOKEN_EXPIRATION_DURATION = process.env.JWT_TOKEN_EXPIRATION;

function generatingSessionToken (userId) {
    return jwt.sign( {userId}, JWT_SECRET_KEY,{
        expiresIn: TOKEN_EXPIRATION_DURATION,
    })
}

function decodingSessionToken(req, res, next) {
    try {
        const sessionToken = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(sessionToken, JWT_SECRET_KEY);
        
        console.log(decodedToken);
        req.decodedSessionToken = sessionToken;
        
        next();

    } catch( err ) {
        res.status(401).json({
            message : 'Invalid Token'
        })
    }
}

module.exports = {
    generatingSessionToken,
    decodingSessionToken
};