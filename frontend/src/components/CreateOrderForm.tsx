import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrder, getAllProducts, type Product } from '../api';
import type { OrderInput } from '../api';
import { useEffect, useState, type Dispatch, type FormEvent, type SetStateAction } from 'react';

interface Props {
  selectItems: OrderInput[];
  setSelectItems: Dispatch<SetStateAction<OrderInput[]>>;
}

export default function CreateOrderForm({ selectItems, setSelectItems }: Props) {
  const [customerName, setCustomerName] = useState('');
  const [productMap, setProductMap] = useState<{ [key: number]: Product }>({});
  const [buttonText, setButtonText] = useState('Place Order');
  const queryClient = useQueryClient();

useEffect(() => {
  const getAllProd = async () => {
    try {
      const products = await getAllProducts();
      const map: { [key: number]: Product } = {};
      products.forEach((p: any) => (map[p.id] = p));

      setProductMap(map);
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
  };

  getAllProd();
}, []);

  const mutation = useMutation({
    mutationFn: (order: { customerName: string; items: OrderInput[] }) => {
      return createOrder(order)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setSelectItems([]);
      setCustomerName('');
      setButtonText('Order Placed!');
      setTimeout(() => setButtonText('Place Order'), 2000);
    },
  });

  const handleRemoveItem = (productId: number) => {
    setSelectItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (selectItems.length === 0) {
      alert('Please select at least one product');
      return;
    }
    mutation.mutate({ customerName, items: selectItems });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-8 bg-gray-800 rounded-2xl shadow-2xl text-white"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Create Order</h2>

      <input
        type="text"
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        required
        className="input-field"
      />

      {selectItems.length > 0 ? (
        <ul className="mb-6 space-y-2 max-h-48 overflow-y-auto">
          {selectItems.map((item) => (
            <li
              key={item.productId}
              className="flex justify-between items-center bg-gray-700 px-3 py-2 rounded-lg border border-gray-600"
            >
              <div>
                {productMap[item.productId]?.name || 'Unknown Product'} x {item.quantity}
              </div>
              <button
                type="button"
                onClick={() => handleRemoveItem(item.productId)}
                className="text-red-500 hover:text-red-700 transition"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 mb-6 text-center">No products selected</p>
      )}

      <button
        type="submit"
        className="w-1/2 mx-auto block bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 py-2 rounded-lg shadow-lg text-white cursor-pointer transition-all duration-300"
      >
        {buttonText}
      </button>
    </form>
  );
}
