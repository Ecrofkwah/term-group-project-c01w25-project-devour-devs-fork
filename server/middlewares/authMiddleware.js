import jwt from 'jsonwebtoken';

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