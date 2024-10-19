const authService = require("../services/login");

async function login(req,res) {
    try{
        const{email,password}= req.body;
        const token = await authService.login(email, password);
        res.json({token: token});
        // req.email = email;
        // req.username = username;
    }
    catch(error) {
        res.status(401).json({message: error.message});
    }
}

async function refreshToken(req,res) {
    try{
        const{token}= req.body;
        const newToken = await authService.authToken(token);
        res.json({newToken: newToken});
    }
    catch(error) {
        res.status(401).json({message: "Invalid Token"});
    }
}


module.exports = {
    login,
    refreshToken
}