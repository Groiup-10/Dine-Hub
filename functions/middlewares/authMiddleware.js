const { admin } = require('../../config/firebase');

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Attach user data to request
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};

module.exports = { verifyToken };


//adding customer claim for roles 
const registerUser = async (req, res) => {
    const { email, password, displayName, role } = req.body;
  
    try {
      // Validate role input
      if (!['admin', 'staff', 'customer'].includes(role)) {
        return res.status(400).json({ error: 'Invalid role specified' });
      }
  
      const userRecord = await admin.auth().createUser({
        email,
        password,
        displayName,
      });
  
      // Add custom claims to define the user's role
      await admin.auth().setCustomUserClaims(userRecord.uid, { role });
  
      res.status(201).json({ uid: userRecord.uid, message: 'User registered successfully', role });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
