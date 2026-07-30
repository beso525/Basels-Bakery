const express = require('express');

const {
  handleImageUpload,
  addProduct,
  deleteProduct,
  editProduct,
  fetchProduct,
  getFilteredProducts
} = require('../../controllers/admin/products-controller')

const { upload } = require('../../helpers/cloudinary');
const { middleware, isAdmin } = require('../../controllers/auth/auth-controller')

const router = express.Router();

router.post('/upload-image', middleware, isAdmin, upload.single('my_file'), handleImageUpload);
router.get('/get', middleware, isAdmin, getFilteredProducts)
router.post('/add', middleware, isAdmin, addProduct);
router.put('/edit/:id', middleware, isAdmin, editProduct);
router.delete('/delete/:id', middleware, isAdmin, deleteProduct);
router.get('/get', middleware, isAdmin, fetchProduct);

module.exports = router;