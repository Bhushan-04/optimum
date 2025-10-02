import { Sequelize } from 'sequelize';
import ProductModel from './Product.js';
import OrderModel from './Order.js';
import OrderItemModel from './OrderItem.js';
import { config } from '../config/config.js';

export const sequelize = new Sequelize(config.database, config.username, config.password, {
  dialect: 'mysql',
  logging: false,
});

export const Product = ProductModel(sequelize);
export const Order = OrderModel(sequelize);
export const OrderItem = OrderItemModel(sequelize);

Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

Product.hasMany(OrderItem, { foreignKey: 'productId', as: 'orderItems' });
OrderItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

export async function syncDb() {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced successfully');

    await Product.bulkCreate([
      { name: 'Black T-shirt', price: 22.5, stock: 10 },
      { name: 'Black Jeans', price: 35, stock: 5 },
      { name: 'White Hoodie', price: 45, stock: 8 },
    ]);

    console.log('Products seeded successfully');
  } catch (err) {
    console.error('Error syncing database:', err);
  }
}
