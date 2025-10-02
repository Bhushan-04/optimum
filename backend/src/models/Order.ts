import { Sequelize, DataTypes, Model,type Optional } from 'sequelize';

export interface OrderAttributes {
  id: number;
  customerName: string;
  total: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type OrderCreation = Optional<OrderAttributes, 'id' | 'total'>;

export default function OrderModel(sequelize: Sequelize) {
  const Order = sequelize.define<Model<OrderAttributes, OrderCreation>>(
    'Order',
    {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      customerName: { type: DataTypes.STRING, allowNull: false },
      total: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
    },
    { tableName: 'orders', timestamps: true }
  );

  return Order;
}
