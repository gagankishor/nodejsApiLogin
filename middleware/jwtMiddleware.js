const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key'; 

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.userId = decoded.userId;
    next();
  });
};
