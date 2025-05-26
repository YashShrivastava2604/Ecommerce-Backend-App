const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateToken} = require('../utils/generateToken')

module.exports.registerUser = async function(req, res){
    try{
        let {name,email,password} = req.body;

        await userModel.findOne({email}) ? res.send('User already exists. Please Login') : bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                let createdUser = await userModel.create({
                    fullname: name,
                    email,
                    password: hash,
                });
                let token = generateToken(createdUser);
                res.cookie('token', token)
                req.flash('success', "Registered successfully")
                res.redirect('/shop')
            })
        })

    } catch(err){
        res.send(err.message)
    }
}

module.exports.loginUser = async function(req, res){
    try{
        let {email, password} = req.body
        let user = await userModel.findOne({email});

        if(!user) return res.send('User not found. Please register first');

        console.log("hashed password : ",user.password)
        console.log("plain text password : ",password)
        
        bcrypt.compare(password, user.password, (err, result) => {
            if(err) return res.send('Error while comparing password')
            if(!result) return res.send('Invalid password');
            let token = generateToken(user);
            res.cookie('token', token);
            req.flash('success', "Logged in successfully")
            res.redirect('/shop')
        })
        
    } catch(err){
        res.send(err.message)
    }
}

module.exports.logoutUser = async function(req, res){
    try{
        res.clearCookie("token")
        req.flash('success', "Logged out successfully")
        res.redirect('/')
    } catch(err){
        res.send(err.message)
    }
}