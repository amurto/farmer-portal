const mongoose = require('mongoose');

const Product = require('../models/product');
const User = require('../models/user');
const HttpError = require('../models/http-error');

const getProducts = async (req, res, next) => {
    let docs;
    try {
        docs = await Product.find()
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find a product.',
            500
        );
        return next(error);
    }
    let AllProducts = [];
    for(let i = 0; i < docs.length; i++) {
        AllProducts.push(docs[i].toObject({ getters: true }));
    }
    console.log(AllProducts[0].creator.name);
    res.json({ products: AllProducts });
};

exports.getProducts = getProducts;