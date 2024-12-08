const express = require('express');
const { createOrder, getOrders } = require('../controllers/orderController');

//Routing roles
const { checkRole } = require('../middlewares/roleMiddleware');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', verifyToken, checkRole('staff'), createOrder); // Only authenticated staff can create orders
router.get('/', verifyToken, checkRole('staff'), getOrders);    // Only authenticated staff can view orders

// admin only routes
router.post('/create-user', checkRole('admin'), registerUser);


router.post('/', createOrder);
router.get('/', getOrders);

module.exports = router;

// const createOrder = (req, res) => {
    // console.log(`Order created by ${req.user.role}`);
    // Continue order processing
  // };
  