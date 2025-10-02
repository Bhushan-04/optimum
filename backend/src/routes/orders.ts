import { Router } from 'express';
import { createOrder, getAllOrders } from '../controllers/OrderCtrl.js';

const router = Router();

//get all orders
router.get('/', getAllOrders);

//create order 
router.post('/', createOrder);

export default router;
