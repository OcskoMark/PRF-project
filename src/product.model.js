const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    productname: {type: String, unique: true, required: true},
    price: {type: Number, required: true},
    amount: {type: Number, required: true}
}, {collection: 'product'});

mongoose.model('product', productSchema);
