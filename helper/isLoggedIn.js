//B.E. Validate the token
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
    let token = "";
    let authorizationToken = req.header("Authorization");
    // console.log("AuthToken > " + authorizationToken);

    if(authorizationToken){
        //we are passing the token to the F.E. using the header using the Bearer token
        token = authorizationToken.replace("Bearer ", ""); 
        // console.log("Token > " + token);
    }

    if(!token){
        return res.status(401).json({"message":"Not allowed"});
    }

    try{
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded.user;
        next();
    }
    catch(err){
        return res.status(401).json({"message":"Your token is Invalid."});
    }
}