const { admin } = require('../../config/firebase');

// Middleware to verify user role
const checkRole = (requiredRole) => {
  return async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized access' });
    }

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);

      if (decodedToken.role !== requiredRole) {
        return res.status(403).json({ error: `Access denied. Requires ${requiredRole} role.` });
      }

      req.user = decodedToken; // Attach decoded token data to request
      next();
    } catch (error) {
      res.status(403).json({ error: 'Invalid or expired token' });
    }
  };
};

module.exports = { checkRole };
