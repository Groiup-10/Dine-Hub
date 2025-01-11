const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
// Import express and other middleware

const validateToken = asyncHandler(async(req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRETE, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error('Invalid token');
            }
            req.user = decoded;
            next();
        });

        if (!token) {
            req.status(401);
            throw new Error('Token not provided');
        }
    }
});


module.exports = validateToken;
