const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes
exports.requireAuth = async (req, res, next) => {
    const token = req.cookies.token;
    if(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decoded)
    
            req.user = await User.findById(decoded.id);
    
            next();
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: 'Invalid token'
            })  
        }
    } else {
        res.status(401).json({
            success: false,
            message: 'Not authorized'
        })
    }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized'
            })
        }
        next()
    }
}