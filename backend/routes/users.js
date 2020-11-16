const express = require('express');
const router = express.Router();

const {
    getUsers,
    getUser,
    deleteUser
} = require('../controllers/users');

const { requireAuth, authorize } = require('../middleweare/auth');

// Include other resource routers
const orderRouter = require('./orders');

// Re-route into other resource routers
router.use('/:id/orders', requireAuth, orderRouter);

router.route('/').get(requireAuth, authorize('admin'), getUsers);
router.route('/:id')
    .get(requireAuth, authorize('admin'), getUser)
    .delete(requireAuth, authorize('admin'), deleteUser)

module.exports = router;