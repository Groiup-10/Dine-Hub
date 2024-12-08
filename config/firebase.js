const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(), // or use serviceAccountKey.json
  databaseURL: 'https://<your-project-id>.firebaseio.com'
});

const db = admin.firestore();

module.exports = { admin, db };
