import { type Request,type Response } from 'express';
import { Product } from '../models/index.js';

export const getAllproduct = async (_req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

 export const createProduct =  async (req: Request, res: Response) => {
  const { name, price, stock } = req.body;
  if (!name || typeof price !== 'number') {
    return res.status(400).json({ error: 'name and price are required' });
  }
  try {
    const product = await Product.create({ name, price, stock: stock || 0 });
    res.status(201).json(product);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}