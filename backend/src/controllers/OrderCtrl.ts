import { Router,type Request,type Response } from 'express';
import { Order, OrderItem, Product, sequelize } from '../models/index.js';
import type { ProductAttributes } from '../models/Product.js';
import type { OrderAttributes } from '../models/Order.js';

interface OrderItemInput {
  productId: number;
  quantity: number;
}

interface CreateOrderBody {
  customerName: string;
  items: OrderItemInput[];
}

export const getAllOrders =  async (_req: Request, res: Response) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [
            { model: Product, as: 'product', attributes: ['id', 'name', 'price'] }
          ],
        },
      ],
    });

    const formattedOrders = orders.map((o: any) => ({
      id: o.id,
      customerName: o.customerName,
      total: o.total,
      items: o.items?.map((item: any) => ({
        productId: item.productId,
        name: item.product?.name,    
        quantity: item.quantity,
        priceAtPurchase: item.priceAtPurchase,
      })),
    }));
    res.json(formattedOrders);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}


export const createOrder = async (req: Request, res: Response) => {
  const body: CreateOrderBody = req.body;

  if (!body.customerName || !Array.isArray(body.items) || body.items.length === 0) {
    return res.status(400).json({ error: 'customerName and items are required' });
  }

  const t = await sequelize.transaction();

  try {
    const order = await Order.create({ customerName: body.customerName, total: 0 }, { transaction: t });
    const orderData = order.get() as OrderAttributes;

    let totalAmount = 0;

    for (const item of body.items) {
      const product = await Product.findByPk(item.productId, { transaction: t });
      if (!product) throw new Error(`Product ID ${item.productId} not found`);

      const productData = product.get() as ProductAttributes;

      if (productData.stock < item.quantity) {
        throw new Error(`Not enough stock for product ${productData.name}`);
      }

      const priceAtPurchase = productData.price;
      totalAmount += priceAtPurchase * item.quantity;

      await OrderItem.create(
        {
          orderId: orderData.id,
          productId: productData.id,
          quantity: item.quantity,
          priceAtPurchase,
        },
        { transaction: t }
      );

      await product.update({ stock: productData.stock - item.quantity }, { transaction: t });
    }

    await order.update({ total: totalAmount }, { transaction: t });

    await t.commit();

    const createdOrder = await Order.findByPk(orderData.id, {
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [{ model: Product, as: 'product' }],
        },
      ],
    });

    res.status(201).json(createdOrder);
  } catch (err: any) {
    await t.rollback();
    res.status(500).json({ error: err.message });
  }
}