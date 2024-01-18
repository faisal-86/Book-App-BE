const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    let token = '';
    let authorizationToken = req.header('Authorization');
    if(authorizationToken){
        token = authorizationToken.replace('Bearer ', '');
    }

    if(!token){
        return res.status(401).json({'message': 'User is not allowed to access this data'});
    }

    try{
        const decoded = jwt.verify(token, process.env.SECRET);
        // Assign user ID
        req.user = decoded.user;
        next();
    }
    catch(err){
        return res.status(401).json({'message': 'Invalid token'});
    }
}