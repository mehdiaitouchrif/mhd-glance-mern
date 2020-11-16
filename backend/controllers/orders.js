const Order = require('../models/Order');
const Product = require('../models/Product');
const errorHandler = require('../utils/errorHandler');


// @desc     Get all orders
// @route    /api/orders
// @route    /api/users/:id/orders
// @access    Private/Admin
exports.getOrders = async (req, res) => {
    try {
        if (!req.params.id) {
            const orders = await Order.find().sort({ createdAt: -1 })
            res.status(200).json({
                success: true,
                count: orders.length,
                data: orders
            })
        } else {
            const orders = await Order.find({ user: req.params.id })
            return res.status(200).json({
                success: true,
                data: orders,
                count: orders.length
            })
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            error: errorHandler(error)
        })
    }
}

// @desc     Get single order
// @route    /api/orders/:id
// @route    /api/users/:userId/orders/:orderId
// @access    Private
exports.getOrder = async (req, res) => {
    try {
        if (req.params.userId && req.params.orderId) {
            const order = Order.findOne({ user: req.params.userId, _id: req.params.orderId })
            if (!order) {
                res.status(404).json({
                    success: false,
                    message: 'Order not found'
                })
            } else {
                res.status(200).json({
                    success: true,
                    order
                })
            }

        } else {
            let order = await Order.findById(req.params.id)
            if (order) {
                res.status(200).json({
                    success: true,
                    data: order
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Order not found'
                })
            }
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            error: errorHandler(error)
        })
    }
}

// @desc     Place order
// @route    /api/orders
// @access    Private/Admin
exports.placeOrder = async (req, res) => {
    try {
        const product = await Product.findById(req.body.product);
        if (!product) {
            res.status(400).json({
                success: false,
                data: 'Product not found'
            })
        }

        const newOrder = {
            ...req.body,
            product
        }
        const order = await Order.create(newOrder);
        res.status(200).json({
            success: true,
            data: order
        })
        await Product.findByIdAndUpdate(req.body.product, { inStock: product.inStock - req.body.quantity }, {
            new: true,
            runValidators: true
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: errorHandler(error)
        })
    }
}

// @desc     Update order
// @route    /api/orders/:id
// @access    Private
exports.updateOrder = async (req, res) => {
    try {
        let order = await Order.findById(req.params.id)
        if (order) {
            order = await Order.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            })
            res.status(201).json({
                success: true,
                data: order
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'Order not found'
            })
        }

    } catch (error) {
        res.status(400).json({
            success: false,
            error: errorHandler(error)
        })
    }
}

// @desc     Delete  orders
// @route    /api/orders/;id
// @access    Private
exports.deleteOrder = async (req, res) => {
    // try {

    // } catch (error) {
    //     res.status(400).json({
    //         success: false,
    //         error: errorHandler(error)
    //     })
    // }
    let order = await Order.findById(req.params.id)
    if (order) {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            message: 'Order deleted'
        })
    } else {
        res.status(404).json({
            success: false,
            message: 'Order not found'
        })
    }
}

