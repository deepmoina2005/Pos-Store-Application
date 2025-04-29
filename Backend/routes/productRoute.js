import express from 'express';
import * as productController from '../controllers/productController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/add', upload.single('image'), productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export default router;
