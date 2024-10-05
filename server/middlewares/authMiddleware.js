const jwt = require('jsonwebtoken');

function authMiddleware (req, res, next) {
  
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
  
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }
  
    const token = authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }
  
    try {
      const decoded = jwt.verify(token, jwtSecretKey);
  
      req.user = decoded.user;
      next();
    } catch (err) {
      res.status(401).json({ msg: err });
    }
  }

  module.exports =  authMiddleware;