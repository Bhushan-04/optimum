# Full Stack Admin Panel Application

The app let users manage products and place customer orders, An order can have multiple products, and stock levels should update when an order is created.

The frontend display:
  - A list of products with stock.
  - A way to create an order with one or more products.
  - A way to view order details.

## Features

- **Product**
  - can create product
  - Dipslay all products
- **Orders**
  - create orders
  - update stocks according to user actions 

## Tech Stack

 (Backend)
- Node.js
- Express.js
- mySql
- Sequelize ORM
- Typescript

 (frontend)
- React
- React Query
- tailwind

## Setup Instructions for backend

### 1. Clone the repository

```bash
git clone https://github.com/Bhushan-04/optimum.git
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root and setup cred:

```
FRONTEND_URL=
DB_USER=
DB_PASS=
DB_NAME=
DB_HOST=
PORT=
```

### 4. Setup Database

1. Make sure **mysql** is running locally.
2. Create database or use sequelize sync:

Tables created: `Products`, `Orders`, `Order_items`.

### 5. set up tsc in package.json commands to start server

```bash
npm run dev
```

server gets started it will tell on which port it is on.

## Setup Instructions for frontend

once backend is running then on frontend in new terminal tab

### 1. switch to frontend in another tab

```bash
cd frontend 
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root and setup cred:

```
VITE_BACKEND_URL=
```

### 4. now run it 

```bash
npm run dev
```





