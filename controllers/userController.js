const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt'); // hashing the password
const jwt = require('jsonwebtoken'); // access endpoint to JWT
const User = require('../models/userModel');

// const UserActivation = require('../models/userActivationModel'); // imported UserActivationModel for email verification
// @desc Register a user 
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body; // create username, password and email for a uer 
    if (!username || !email || !password) {
        res.status(400);
        throw new Error ("Invalid username or email");
    }
    const userAvailable = await User.findOne({email});
    if (userAvailable) {
        res.status(400);
        throw new Error ("User already registered");
    }
    // Hash the user password and store it
    // bcript module for hashing
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds
    console.log ("hashpassword: ", hashedPassword)
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    console.log ("user: ", user);
    if(user) {
        res.status(201).json({_id: user._id, email: user._email});
    res.json({message: "Register the user"});
    }else{
    res.status(400);
    throw new Error ("User data is not valid");
    }
});

// @desc Login user 
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error ("All fields are mandatory");
    }
    const user = await User.findOne({email});
    // compare password with hashpassword
    if(user && (await bcrypt.compare(password, user.password))) {
    // create token
    const accessToken = jwt.sign({
        user: {
            username: user.username, 
            email: user.email,
            id: user.id,
        },
    }, 
        process.env.JWT_SECRET,
        { expiresIn: '15m' });
        res.json({ accessToken });
        res.json({message: "Login user"});

    }else {
        res.status(401);
        throw new Error ("Invalid email or password");
    }
});

// @desc Current user information 
// @route POST /api/users/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);    
});

module.exports = {registerUser, loginUser, currentUser};
