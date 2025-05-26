const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    }],
    orders: [],
    contact: Number,
    picture: String,
    address: String,
}, { strictPopulate: false });

const User = mongoose.models.user || mongoose.model('user', userSchema);

module.exports = User;