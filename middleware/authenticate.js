const jwt = require('jsonwebtoken');
const key = require('../config/keys');


const auth = (req, res, next) => {
    const token = req.header('x-auth-token')
    if(!token) {
        res.status(401).json({
            message: 'Access denied. Token not provided'
        })
    }
    try{
        const decoded = jwt.verify(token, key.secretOrKey);
         req.user = decoded;
        next();
    }catch (err) {
        res.status(401).json({
            message: 'Bad Request'
        })
    }
}



module.exports = auth;
