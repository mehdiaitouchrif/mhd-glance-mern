const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    product: {
        type: Object,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required']
    },
    size: {
        type: String,
        required: [true, 'Size is required']
    },
    name: {
        type: String,
        required: [true, 'Buyer name is required']
    },
    city: {
        type: String,
        required: [true, 'City is required']
    },
    address: {
        type: String,
        required: [true, 'Physical address is required']
    },
    zipcode: {
        type: String,
        required: [true, 'Zipcode is required']
    },
    email: {
        type: String,
        required: [true, 'email is required']
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'delivered']
    }
}, { timestamps: true })


const Order = mongoose.model('order', OrderSchema);

module.exports = Order;