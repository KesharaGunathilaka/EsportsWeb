const bcrypt = require("bcrypt");
const User = require("../models/users");
const { generateToken } = require("../utils/jwtUtils");
const {verifyToken} = require("../utils/authMiddleware");

async function login(email, password) {
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw new Error("User not found");
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            throw new Error("Incorrect Password");
        }
        const token = generateToken(existingUser);
        // req.username=username;
        // req.email=email;
        return token;
    } catch (error) {
        console.log("Login error", error.message);
        throw new Error(error.message); // Send the specific error message to the client
    }
}

async function refreshToken(oldToken) {
   try {
    const decodedToken =verifyToken(oldToken);
    const user = User.findById(decodedToken._id);
    if(!user){
        throw new error("user not found");
    }
    const newToken = generateToken(user);
    return newToken;

   } catch (error) {
    throw new error("Invalid Token");
    
   }
}

module.exports = { login, refreshToken }