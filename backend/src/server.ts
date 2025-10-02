import express from 'express';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import { sequelize, syncDb } from './models/index.js';
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
  origin: process.env.FRONTEND_URL
}));

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

sequelize.sync().then(() => {
    //  syncDb();
  console.log('Database synced');
  app.listen(process.env.PORT, () => {
    console.log(`server is running on ${process.env.PORT}`);
  });
});
