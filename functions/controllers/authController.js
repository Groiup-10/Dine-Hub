const { admin } = require('../../config/firebase');

// Register a new user
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

    // Add custom claims for role-based access
    await admin.auth().setCustomUserClaims(userRecord.uid, { role });

    res.status(201).json({ uid: userRecord.uid, message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login (Verify token)
const verifyToken = async (req, res) => {
  const { token } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    res.status(200).json({ uid: decodedToken.uid, role: decodedToken.role });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { registerUser, verifyToken };
