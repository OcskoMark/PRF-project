const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const userModel = mongoose.model('user');
const productModel = mongoose.model('product');
const orderModel = mongoose.model('order'); 