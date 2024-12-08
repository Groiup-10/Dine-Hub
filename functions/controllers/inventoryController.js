const { db } = require('../../config/firebase');

// Add or update inventory item (Admin only)
const updateInventory = async (req, res) => {
  const { itemName, quantity, threshold } = req.body;

  try {
    const docRef = await db.collection('inventory').doc(itemName).set({
      quantity,
      threshold,
      updatedAt: admin.firestore.Timestamp.now(),
    });

    res.status(200).json({ message: 'Inventory updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all inventory items (Staff only)
const getInventory = async (req, res) => {
  try {
    const inventorySnapshot = await db.collection('inventory').get();
    const inventory = inventorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { updateInventory, getInventory };
