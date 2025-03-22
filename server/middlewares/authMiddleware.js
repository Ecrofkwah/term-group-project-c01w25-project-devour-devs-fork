import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';

export const authenticateUser = (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(401).json({
            success: false,
            message: "Unauthorized: Missing token"
        })
    }

    const token = req.headers.authorization.split(" ")[1];
    if(!token){
        return res.status(401).json({
            success: false,
            message: "Unauthorized: Missing token"
        })
    }

    try{
        const userInfo = jwt.verify(token, process.env.JWT_SECRET);
        // attach userInfo to req body. userInfo contains userId and username
        req.user = userInfo;
        next();
    } catch (error){
        return res.status(401).json({
            success: false,
            message: "Unauthorized: Invalid token"
        })
    }
}

// validate register input
export const validateRegisterInput = [
    body('username')
      .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters')
      .matches(/^[a-zA-Z0-9_-]+$/).withMessage('Username can only contain letters, numbers, underscores, and hyphens')
      .trim()
      .escape(),
    body('email')
      .isEmail().withMessage('Invalid email address')
      .normalizeEmail()
      .trim()
      .escape(),
    body('password')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
      .trim()
      .escape(),
];

// validate login input
export const validateLoginInput = [
    body('email')
      .isEmail().withMessage('Invalid email address')
      .normalizeEmail()
      .trim()
      .escape(),
    body('password')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
      .trim()
      .escape(),
];

// validate result
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    next();
};