const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    e_mail: {type: String, unique: true, required: true},
    admin: {type: Boolean, require: true}
}, {collection: 'user'});

mongoose.model('user', userSchema);

var productSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true},
    price: {type: Number, required: true},
    amount: {type: Number, required: true}
}, {collection: 'product'});

mongoose.model('product', productSchema);

var orderSchema = new mongoose.Schema({
    user_name: {type: String, required: true},
    product_name: {type: String, required: true},
    amount: {type: Number, required: true},
    price: {type: Number, required: true}
}, {collection: 'order'});

mongoose.model('order', orderSchema);