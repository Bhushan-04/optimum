import { useQuery } from '@tanstack/react-query';
import { getOrders, type Order } from '../api';

export default function OrderList() {
  const { data: orders, isLoading, error } = useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: getOrders,
  });

  if (isLoading) return <p className="text-gray-400">Loading orders...</p>;
  if (error) return <p className="text-red-500">Error loading orders</p>;

  return (
    <div className="max-w-2xl mx-auto mt-6 text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Orders</h2>

      <div className="space-y-4">
        {orders?.map((ord) => (
          <div
            key={ord.id}
            className="bg-gray-700 rounded-2xl shadow-md p-4 border border-gray-600 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center mb-2">
              <p className="font-bold text-lg">{`Order #${ord.id} - ${ord.customerName}`}</p>
              <p className="font-semibold text-green-400">${ord.total}</p>
            </div>

            <ul className="divide-y divide-gray-600">
              {ord.items.map((i) => (
                <li key={i.productId} className="py-2 flex justify-between">
                  <span className="font-medium">{i.name}</span>
                  <div className="flex gap-2 items-center">
                    <span className="font-semibold text-green-300">${i.priceAtPurchase}</span>
                    <span className="text-gray-300">{`x${i.quantity}`}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
