const express = require('express');
const { updateInventory, getInventory } = require('../functions/controllers/inventoryController');
const { checkRole } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.post('/', checkRole('admin'), updateInventory); // Admin can update inventory
router.get('/', checkRole('staff'), getInventory);     // Staff can view inventory

module.exports = router;
