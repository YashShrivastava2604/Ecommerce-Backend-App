const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model')

router.get('/', (req, res) => {
    res.send('Hello');
});

router.get('/admin', (req, res) => {
    let error = req.flash('error')?req.flash('error'):null;
    let success = req.flash('success');
    res.render('createProducts', {error, success})
})

if(process.env.NODE_ENV === "development"){
    router.post("/create", async (req,res) => {

        let owners = await ownerModel.find();
        if (owners.length > 0){
            return res.status(400).send("Owner already exists")
        }

        const {fullname, email, password} = req.body;
        if (!fullname || !email || !password) {
            return res.status(400).send("Please provide all fields")
        }

        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password,
        })
        res.send(createdOwner)
    })
}

module.exports = router;