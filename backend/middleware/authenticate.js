// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const authenticate = (req, res, next) => {
//     const token = req.header('Authorization')?.replace('Bearer ', '').trim();

//     if (!token) {
//         return res.status(401).json({ message: 'No token provided' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         console.log(decoded);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         res.status(401).json({ message: 'Invalid token' });
//     }
// }
// module.exports = authenticate;