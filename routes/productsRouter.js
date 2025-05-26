const express = require('express');
const router = express.Router();
const upload = require('../config/multer-config')
const productModel = require('../models/product-model')

router.post('/createProduct', upload.single("productImage"), async (req, res) => {
    try{
        let{ name, price, discount, bgcolor, panelcolor, textcolor} = req.body;
    let product = await productModel.create({
        image: req.file.buffer,
        name,
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor
    })
    req.flash('success', 'Product created successfully');
    res.redirect('/shop');
}
 catch(err){
    console.log(err);
    req.flash('error', 'Something went wrong');
    res.redirect('/owner/admin');
}       
})


module.exports = router;