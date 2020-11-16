const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required']
    },
    description: {
        type: String,
        required: [true, 'Product description is required']
    },
    category: {
        type: String,
        default: 'main',
        enum: ['shoes', 'accessories', 'fashion', 'electronics', 'sports']
    },
    inStock: {
        type: Number,
        required: [true, 'Stock quantity is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    image: {
        type: String,
        default: 'no-img.png',
        required: [true, 'Product image is required']
    },
    size: {
        type: Array,
    }
}, { timestamps: true })

// Cancel orders related to deleted product
ProductSchema.pre('remove', async function (next) {
    await this.model('order').deleteMany({ product: this._id })
    next();
});

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;