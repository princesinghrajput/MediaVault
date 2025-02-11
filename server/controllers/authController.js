const User = require("../models/User");
const jwt = require("jsonwebtoken");

const registerUser = async(req, res) => {
    try {
        const {username, email, password} = req.body;        
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields"
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [
                { email: email.toLowerCase() },
                { username: username.toLowerCase() }
            ]
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: existingUser.email === email.toLowerCase() 
                    ? "Email already registered" 
                    : "Username already taken"
            });
        }

        // Create new user
        const user = await User.create({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password
        });

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username,
            }, 
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Send response
        res.status(201).json({
            success: true,
            message: "Registration successful",
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: "Registration failed",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const loginUser = async(req, res)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({message: "Invalid email or password"});
        }

        //check password
        const isMatch = await user.comparePassword(password);

        if(!isMatch){
            return res.status(401).json({message: "Invalid credentials"});
        }

        const token = jwt.sign({
            userId: user._id,
            username: user.username,
        }, process.env.JWT_SECRET, {expiresIn: "1h"});


        res.status(200).json({
            token,
            user:{
                id: user._id,
                username: user.username,
                email: user.email,
            }
        })
        
    } catch (error) {
        res.status(500).json({message: "Error logging in", error: error.message});
        
    }
}

module.exports = {
    registerUser,
    loginUser
}