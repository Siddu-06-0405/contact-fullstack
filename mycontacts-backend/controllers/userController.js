// we don't save raw passwords of users in our database
// instead we save hashed passwords
// for hashing password we are gonna use bycrypt module

//@desc Register a user
//@route POST /api/users/register
//@access public
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const registerUser = asyncHandler(async (req,res)=>{
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error('Please fill in all fields');
    };
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    };
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log("Hashed Password:",hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    console.log(`User created ${Promise.resolve(user)}`);
    if(user){
        res.status(201).json({ _id: user.id, email: user.email });
    }else {
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.json({ message: "Register the user"});
});

//@desc Login as a user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req,res)=>{
    res.json({ message: "Login the user"});
});

//@desc Get currengt user
//@route POST /api/users/register
//@access private
const currentUser = asyncHandler(async (req,res)=>{
    res.json({ message: "Get the current user" });
})

module.exports = {registerUser,loginUser,currentUser};