import express from 'express';
import * as categoryController from '../controllers/categoryController.js';
import adminAuth from "../middleware/auth.js";

const router = express.Router();

router.post('/',categoryController.createCategory);
router.get('/',adminAuth, categoryController.getAllCategories);
router.get('/:id',adminAuth, categoryController.getCategoryById);
router.put('/:id',adminAuth, categoryController.updateCategory);
router.delete('/:id',adminAuth, categoryController.deleteCategory);

export default router;
