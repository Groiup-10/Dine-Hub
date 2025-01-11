const mongoose = require("mongoose");

// things that should be collected form the user interface
const contactSchema = mongoose.Schema({
    
    // _id: mongoose.Schema.Types.ObjectId, // auto-generated id for each contact, using MongoDB's built-in ObjectID type
    user_id: {
        type: mongoose.Schema.Types.ObjectId, // unique identifier for each contact object in the database
        required: true,
        ref: "User" // reference to the User model
     }, 
    name: {
        type: String,
        required: [true, "Required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter a valid email address"],
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    phone: {
        type: String,
        required: [true, "Please enter a valid phone number"],
        unique: true,
        match: /^\+?[1-9]\d{0,14}$/
    },
}, {
    timestamps: true,
    // versionKey: false,
    // toObject: { virtuals: true },
    // toJSON: { virtuals: true },
});

module.exports = mongoose.model("Contact", contactSchema); // Contact is now tthe name of the mongoose model
