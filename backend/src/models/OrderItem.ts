import { Sequelize, DataTypes, Model,type Optional } from 'sequelize';

export interface OrderItemAttributes {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  priceAtPurchase: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type OrderItemCreation = Optional<OrderItemAttributes, 'id'>;

export default function OrderItemModel(sequelize: Sequelize) {
  const OrderItem = sequelize.define<Model<OrderItemAttributes, OrderItemCreation>>(
    'OrderItem',
    {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      orderId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      productId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      quantity: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      priceAtPurchase: { type: DataTypes.FLOAT, allowNull: false },
    },
    { tableName: 'order_items', timestamps: true }
  );

  return OrderItem;
}
