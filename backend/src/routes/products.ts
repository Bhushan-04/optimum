import { Router,type Request,type Response } from 'express';
import { getAllproduct, createProduct } from '../controllers/ProductCtrl.js';

const router = Router();

//get all products
router.get('/', getAllproduct);

//craete product
router.post('/', createProduct);

export default router;
