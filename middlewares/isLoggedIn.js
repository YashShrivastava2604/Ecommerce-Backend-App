const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports = async (req, res, next) => {

    if(!req.cookies.token){
        req.flash('error', "Please login or register to access this page");
        return res.redirect('/')
    }

    try{

        let decoded = jwt.verify(req.cookies.token, process.env.JWT_Key);
        // console.log(decoded);
        let user = await userModel.findOne({
            email : decoded.email
        }).select('-password');
        req.user = user;
        next();

    } catch(err) {
        req.flash('error', "Something went wrong. Please try again later");
        return res.redirect('/')
    }
}