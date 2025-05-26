const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn')
const {logoutUser} = require('../controllers/authController');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model')

router.get('/', (req,res) => {
    let error = req.flash('error')?req.flash('error'):null;
    let success = req.flash('success');
    res.render('index', { error, success, loggedin : false })
})

router.get('/shop',isLoggedIn, async (req, res) => {
    // let products = await productModel.find();
    let error = req.flash('error');
    let success = req.flash('success');
    let sortOption = req.query.sort;
    let sortQuery = {};

    if (sortOption === 'priceLowToHigh') sortQuery = { price: 1 };
    else if (sortOption === 'priceHighToLow') sortQuery = { price: -1 };
    else if (sortOption === 'latest') sortQuery = { createdAt: -1 }; 

    const products = await productModel.find().sort(sortQuery);
    res.render('shop', { products, error, success });
})

router.get('/shop/collections/:type', async (req, res) => {

    let error = req.flash('error');
    let success = req.flash('success');

    const { type } = req.params;
    let filter = {};

    if (type === 'all') {
        filter = {}; // No filter
    } else if (type === 'discounted') {
        filter = { discount: { $gt: 0 } }; 
    }

    if(type === 'new'){
        const products = await productModel.find().sort({ createdAt: -1 });
        res.render('shop', { products, error, success });
    }
    else{
        const products = await productModel.find(filter);
        res.render('shop', { products, error, success });
    }
    
});


router.get('/addToCart/:productId', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    if (!user) {
        req.flash('error', 'User not found');
        return res.redirect('/shop');
    }
    if (!Array.isArray(user.cart)) {
        user.cart = [];
    }
    try {
        user.cart.push(req.params.productId);
        await user.save();
        req.flash('success', 'Product added to cart');
        // console.log(" saved, cart is now:", user.cart);
    } catch (err) {
        // console.error("‼️ error saving user:", err);
        req.flash('error', 'Could not add to cart');
    }
    return res.redirect('/shop');
})

router.get('/cart', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).populate("cart")
    // console.log("User : ",user)
    // console.log("Cart : ",user.cart)
    let error = req.flash('error')?req.flash('error'):null;
    let success = req.flash('success');
    res.render('cart', { error, success, user})
})


module.exports = router;