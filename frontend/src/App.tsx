// App.tsx
import { useState } from "react";
import ProductList from "./components/productList";
import CreateProductForm from "./components/createProduct";
import CreateOrderForm from "./components/CreateOrderForm";
import OrderList from "./components/OrdersList";
import type { OrderInput } from "./api";

export default function App() {
  const [selectItems, setSelectItems] = useState<OrderInput[]>([]);

  return (
    <div className="bg-gray-800 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Admin panel</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 space-y-6">
        <div>
          <CreateProductForm />
          <ProductList selectItems={selectItems} setSelectItems={setSelectItems} />
        </div>

        <div className="pl-6 border-l border-gray-600">
          <CreateOrderForm selectItems={selectItems} setSelectItems={setSelectItems} />
          <OrderList />
        </div>
      </div>
    </div>
  );
}
