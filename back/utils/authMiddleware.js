const jwt = require("jsonwebtoken");
const {secretKey} = require("../configuration/jwtConfig");

function verifyToken(token){
    jwt.verify(token,secretKey);
}

module.exports = {verifyToken};


