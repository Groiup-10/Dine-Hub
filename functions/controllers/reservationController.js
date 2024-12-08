const { db } = require('../../config/firebase');

// Create a reservation
exports.createReservation = async (req, res) => {
  const { customerName, date, time, tableNumber, partySize } = req.body;

  try {
    const reservationRef = await db.collection('reservations').add({
      customerName,
      date,
      time,
      tableNumber,
      partySize,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({ message: 'Reservation created successfully', id: reservationRef.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create reservation' });
  }
};

// Get all reservations
exports.getReservations = async (req, res) => {
  try {
    const snapshot = await db.collection('reservations').get();
    const reservations = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    res.status(200).json({ reservations });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reservations' });
  }
};

// Update a reservation
exports.updateReservation = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    await db.collection('reservations').doc(id).update(updatedData);
    res.status(200).json({ message: 'Reservation updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update reservation' });
  }
};

// Cancel a reservation
exports.cancelReservation = async (req, res) => {
  const { id } = req.params;

  try {
    await db.collection('reservations').doc(id).update({ status: 'canceled' });
    res.status(200).json({ message: 'Reservation canceled successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to cancel reservation' });
  }
};
