const express = require("express");

// import routes
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

//create app
connectDb();
const app = express();

const port = process.env.PORT || 5000;
// LISTING PORT

// middleware
app.use(express.json()); // to display json format
app.use("/api/orders", require("./routes/adminRoute"));
app.use(errorHandler);

app.listen(port, () => {
    console.log('Server running on port ${port}');
});








