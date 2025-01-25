import bcrypt from 'bcrypt'
import { User } from '../models/User.js'
import jwt from 'jsonwebtoken'

const signUserUp = async (req, res) => {
    const {username, email, password} = req.body;
    
    const emailExisted = await User.findOne({email})
    if(emailExisted){
        return res.json({success: false, message: "Sign up failed - Email already existed"})
    }
    
    const usernameExisted = await User.findOne({username})
    if(usernameExisted){
        return res.json({success: false, message: "Sign up failed - username already existed"})
    }

    // hash password
    const hashpassword = await bcrypt.hash(password, 10)
    
    const newUser = new User({
        username, email, password: hashpassword
    })

    await newUser.save()
    return res.json({success: true, message: "Successfully signed up"})

}

const logUserIn = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email})

    if(!user){
        return res.json({success: false, message: "User not found"})
    }

    const isMatchedPassword = await bcrypt.compare(password, user.password)
    if(!isMatchedPassword){
        return res.json({success: false, message: "Incorrect password"})
    }

    // Generate JWT
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
    
    // Send token as cookie
    res.cookie('token', token, {httpOnly: true, maxAge: 3600000})

    return res.json({success: true, message: "Successfully logged in"})


}

export { signUserUp, logUserIn }