const express = require('express');
const { createReservation, getReservations,
    updateReservation,
    cancelReservation,
 } = require('../controllers/reservationController');
const { checkRole } = require('../middlewares/roleMiddleware');

const router = express.Router();

// Routes for reservation management
router.post('/', checkRole('customer'), createReservation); // Create a reservation
router.get('/', checkRole('admin'), getReservations); // Get all reservations
router.put('/:id', checkRole('admin'), updateReservation); // Update a reservation
router.delete('/:id', checkRole('admin'), cancelReservation); // Cancel a reservation

module.exports = router;
