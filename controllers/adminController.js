// import asyncHandler
const asyncHandler = require("express-async-handler");

// @desc Create order
// @route POST /api/orders
// @access private
const createOrder = asyncHandler(async (req, res) => {
    console.log("The request body is :", req.body); // display body
    const {name, orderID, phone} = req.body; // structure the out put
    // error handling
    if(!name || orderID || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    res.status(200).json({message: "Get single order"}); // responds in a json format
});

// @desc GET all orders
// @route GET /api/orders
// @access private
const getOrders = asyncHandler(async (req, res) => {
    res.status(200).json({message: "Get all orders"}); // responds in a json format 
});

// @desc GET single order
// @route GET /api/orders/:id
// @access private
const getOrder = asyncHandler(async (req, res) => {
    res.status(200).json({message: "Get single order"}); // responds in a json format
});

// @desc update order
// @route PUT /api/orders/:id
// @access private
const updateOrder = asyncHandler(async (req, res) => {
    res.status(200).json({message: "Get single order"}); // responds in a json format
});

// @desc GET single order
// @route DELETE /api/orders/:id
// @access private
const deleteOrder = asyncHandler(async (req, res) => {
    res.status(200).json({message: "Get single order"}); // responds in a json format
});

module.exports = {
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder,
}

