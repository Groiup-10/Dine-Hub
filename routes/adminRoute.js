const express = require('express'); // use express
const router = express.Router(); // express router imported
const {
    getOrders,
    createOrder,
    updateOrder,
    deleteOrder,
    getOrder
} = require ('../controllers/adminController');

router.route("/").get(getOrders).post(createOrder);

router.route("/:id").get(getOrder).put(updateOrder).get(deleteOrder);

module.exports = router;
