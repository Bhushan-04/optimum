import dotenv from 'dotenv';
dotenv.config(); 

export const PORT = process.env.PORT || 4000;
export const config: any = {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
}
