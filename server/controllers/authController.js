import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
    try{
        const {username, email, password} = req.body;

        // Check for existing email
        const existingEmail = await User.findUserByEmail(email);
        if (existingEmail){
            return res.status(400).json({
                success: false,
                message: "Email already existed"
            })
        }

        // Check for existing username
        const existingUsername = await User.findUserByUsername(username);
        if(existingUsername){
            return res.status(400).json({
                success: false,
                message: "Username already existed"
            })
        }

        // Create and save new user
        const newUser = new User({username, email, password});
        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User register successfully",
            userId: newUser._id
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

const login = async (req, res) => {
    try{
        const {email, password} = req.body;

        // Find user
        const user = await User.findUserByEmail(email);
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        // Generate JWT token
        const token = jwt.sign({
            userId: user._id,
            username: user.username,
        }, process.env.JWT_SECRET, {
            expiresIn: "3h",
        })

        // Send token to frontend
        res.status(201).json({
            token,
            userId: user._id,
            success: true,
            message: "Logged in successfully",
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

const me = (req, res) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }
    res.status(201).json({
        userId: req.user.userId,
        username: req.user.username
    })
}

const authController = {
    register,
    login,
    me
}

export default authController;