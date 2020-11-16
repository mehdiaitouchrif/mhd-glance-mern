const express = require('express');
const router = express.Router();

const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  uploadImage
} = require('../controllers/products');

const { requireAuth, authorize } = require('../middleweare/auth');

router.route('/')
  .get(getProducts)
  .post(requireAuth, authorize('admin'), addProduct)
router.route('/:id')
  .get(getProduct)
  .put(requireAuth, authorize('admin'), updateProduct)
  .delete(requireAuth, authorize('admin'), deleteProduct)
router.route('/:id/image')
  .put(requireAuth, authorize('admin'), uploadImage)

module.exports = router;