import { Sequelize, DataTypes, Model,type Optional } from 'sequelize';

export interface ProductAttributes {
  id: number;
  name: string;
  price: number;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ProductCreation = Optional<ProductAttributes, 'id'>;

export default function ProductModel(sequelize: Sequelize) {
  const Product = sequelize.define<Model<ProductAttributes, ProductCreation>>(
    'Product',
    {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.FLOAT, allowNull: false },
      stock: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
    },
    { tableName: 'products', timestamps: true }
  );

  return Product;
}
