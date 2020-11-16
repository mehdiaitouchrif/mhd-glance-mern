const express = require('express');
const router = express.Router({ mergeParams: true });

const {
    getOrders,
    getOrder,
    deleteOrder,
    updateOrder,
    placeOrder
} = require('../controllers/orders');

const { requireAuth, authorize } = require('../middleweare/auth');

router.route('/')
    .get(requireAuth, getOrders)
    .post(requireAuth, placeOrder)
router.route('/:id')
    .get(requireAuth, getOrder)
    .put(requireAuth, authorize('admin'), updateOrder)
    .delete(requireAuth, deleteOrder)

module.exports = router;