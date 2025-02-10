import jwt from 'jsonwebtoken';

export const authenticateUser = (req, res, next) => {
    const token = req.cookies.jwt;
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