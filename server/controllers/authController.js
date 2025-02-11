const User = require("../models/User");
const jwt = require("jsonwebtoken");

const registerUser = async(req, res, next)=>{
    try {
        const {username, email, password} = req.body;
        console.log(username, email, password);
        const existingUser = await User.findOne({$or :[{email}, {username}]})

        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }


        const user = await User.create({username, email, password});
  
        await user.save();

        const token = jwt.sign({
            userId: user._id,
            username: user.username,
        }, process.env.JWT_SECRET, {expiresIn: "1h"});

        res.status(201).json({
            token,
            user:{
                _id: user._id,
                username: user.username,
                email: user.email,
            }
        })
    } catch (err) {
        res.status(500).json({message: "Internal server error"});
        
    }
}

module.exports = {
    registerUser
}