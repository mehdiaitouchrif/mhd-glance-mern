const Product = require('../models/Product');
const path = require('path');
const errorHandler = require('../utils/errorHandler');

// @desc     Get all products
// @route    api/products
// @access   Public
exports.getProducts = async (req, res) => {
    try {
        let query;
        let queryStr = JSON.stringify(req.query)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

        let searchQuery = req.query.search ? {
            name: {
                $regex: req.query.search,
                $options: 'i'
            }
        } : {}

        query = Product.find(JSON.parse(queryStr))
        searchQuery = Product.find({ ...searchQuery })
        let products;
        if (req.query.search) {
            products = await searchQuery
        } else {
            products = await query
        }

        res.json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            errors: errorHandler(error)
        })
    }
}

// @desc    Get single product
// @route   api/products/:id
// @access   Public
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (product) {
            res.json({
                success: true,
                data: product
            });
        } else {
            res.json({
                success: false,
                messgae: 'Product not found'
            })
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            errors: errorHandler(error)
        })
    }
}

// @desc    Add product
// @route   api/products
// @access  Private
exports.addProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.json({
            success: true,
            data: product
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            errors: errorHandler(error)
        })
    }
}

// @desc    Update product
// @route   api/products/:id
// @access  Private
exports.updateProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id)
        if (product) {
            product = await Product.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            })

            res.json({
                success: true,
                data: product
            })
        } else {
            res.status(404).json({
                message: 'Product not found'
            })
        }

    } catch (error) {
        res.status(400).json({
            success: false,
            errors: errorHandler(error)
        })
    }
}

// @desc    Delete product
// @route  /api/products/:id
// @access  Private
exports.deleteProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if (product) {
            await Product.findByIdAndRemove(req.params.id);

            res.json({ msg: 'Product removed' });

        } else {
            res.status(404).json({
                message: 'Product not found'
            })
        }
    } catch (err) {
        res.status(500).json({
            errors: 'Server Error'
        })
    }
}

// @desc    Upload Product Image
// @route   /api/products/:id/image
// @access    Private
exports.uploadImage = async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        return res.status(404).json({
            message: 'Product not found'
        })
    }

    if (!req.files) {
        return res.status(400).json({
            message: 'Please upload an image'
        })
    }

    const file = Object.values(req.files)

    if (!file[0].mimetype.startsWith('image')) {
        return res.status(400).json({
            message: 'Please enter an image file'
        })
    }

    if (file[0].size > process.env.MAX_FILE_UPLOAD) {
        return res.status(400).json({
            message: `Image size must be under ${process.env.IMAGE_SIZE / (1024 * 1024)}mb`
        })
    }

    if (path.parse(file[0].name).ext !== '.webp') {
        return res.status(400).json({
            message: `Image type must be webp for optimisation & website speed`
        })
    }

    // Create custom filename
    file[0].name = `${product._id}${path.parse(file[0].name).ext}`;
    console.log(path.parse(file[0].name).ext)

    file[0].mv(`${process.env.FILE_UPLOAD_PATH}/${file[0].name}`, async (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: 'Problem with file uplaod'
            })
        }

        await Product.findByIdAndUpdate(req.params.id, { image: file[0].name })

        res.status(200).json({
            success: true,
            data: file[0].name
        })
    })

}