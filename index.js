const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/firebase');
const { admin, db } = require('./config/firebase');
// 
const { checkRole } = require('./functions/middlewares/roleMiddleware');
const reservationRoutes = require('./functions/routes/reservationRoutes');

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Load environment variables
dotenv.config();

app.use(cors({ origin: true }));
app.use(express.json());

// Routes
// app.get('/', (req, res) => {
//    res.send('API is running...')
//});

app.use('/api/auth', require('./functions/routes/authRoutes'));
app.use('/api/orders', checkRole('staff'), require('./functions/routes/orderRoutes'));
app.use('/api/reservations', checkRole('customer'), require('./functions/routes/reservationRoutes'), reservationRoutes);
app.use('/api/inventory', checkRole('admin'), require('./functions/routes/inventoryRoutes'));


// Listen on Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Export the app as a Cloud Function
exports.api = functions.https.onRequest(app);