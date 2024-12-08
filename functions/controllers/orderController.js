const { db } = require('../../config/firebase');

// Create a new order
const createOrder = async (req, res) => {
  const { tableNumber, items, status } = req.body;

  try {
    const newOrder = {
      tableNumber,
      items,
      status,
      createdAt: admin.firestore.Timestamp.now(),
    };

    const docRef = await db.collection('orders').add(newOrder);
    res.status(201).json({ id: docRef.id, message: 'Order created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all orders
const getOrders = async (req, res) => {
  try {
    const ordersSnapshot = await db.collection('orders').get();
    const orders = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createOrder, getOrders };
