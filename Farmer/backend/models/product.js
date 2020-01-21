const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const productSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    quantity: { type: String, required: true },
    unit: { type: String, required: true },
    price: { type: Number, required: true},
    category: { type: String, required: true },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
    state: { type: String, required: true },
    district: { type: String, required: true },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    transactions: []
});

module.exports = mongoose.model('Product', productSchema);