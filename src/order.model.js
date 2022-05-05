const mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    username: {type: String, required: true},
    produtname: {type: String, required: true},
    price: {type: Number, required: true},
    date: {type: Date, required: true}
}, {collection: 'order'});

mongoose.model('order', orderSchema);