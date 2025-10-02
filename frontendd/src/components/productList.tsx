import { useQuery } from '@tanstack/react-query';
import { getAllProducts, type Product } from '../api';
import type { OrderInput } from '../api';
import type { Dispatch, SetStateAction } from 'react';

interface Props {
  selectItems: OrderInput[],
  setSelectItems: Dispatch<SetStateAction<OrderInput[]>>;
}

export default function ProductList({ selectItems, setSelectItems }: Props) {
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });

  console.log(products);

  if (isLoading) return <p className="text-gray-400">Loading products...</p>;
  if (error) return <p className="text-red-500">Error loading products</p>;

  const handleAddToCart = (product: Product) => {
    if (product.stock === 0) return;
    const exists = selectItems.find((i) => i.productId === product.id);
    if (!exists) {
      setSelectItems((prev: any) => [...prev, { productId: product.id, quantity: 1 }]);
    }
  };

  const handleIncrease = (product: Product) => {
    setSelectItems((prev) =>
      prev.map((i) =>
        i.productId === product.id
          ? { ...i, quantity: Math.min(i.quantity + 1, product.stock) }
          : i
      )
    );
  };

  const handleDecrease = (product: Product) => {
    setSelectItems((prev) =>
      prev
        .map((i) =>
          i.productId === product.id
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  return (
    <div >
      <div>
        <h2 className="text-2xl font-bold mb-4 text-center py-6">Products</h2>

      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products?.map((p) => {
          const cartItem = selectItems.find((i) => i.productId === p.id);
          const quantityInCart = cartItem?.quantity || 0;
          const isOutOfStock = p.stock === 0;

          return (
            <div
              className={`p-4 rounded-2xl border shadow-md transition-shadow 
              ${isOutOfStock ? 'bg-gray-700 text-gray-400' : 'bg-gray-800 text-white hover:shadow-xl'}
            `}
            >
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="text-gray-400">Price: ${p.price}</p>
              <p className="text-gray-400 text-sm">Stock: {p.stock}</p>

              {quantityInCart === 0 ? (
                <button
                  onClick={() => handleAddToCart(p)}
                  disabled={isOutOfStock}
                  className={`mt-2 w-full py-2 rounded-lg shadow text-white transition 
       ${isOutOfStock
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-teal-600 hover:bg-teal-500 cursor-pointer'}`
                  }
                >
                  {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                </button>
              ) : (
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => handleDecrease(p)}
                    className="bg-gray-600 px-2 py-1 rounded hover:bg-gray-500 transition"
                  >
                    -
                  </button>
                  <span className="px-2">{quantityInCart}</span>
                  <button
                    onClick={() => handleIncrease(p)}
                    className="bg-teal-600 text-white px-2 py-1 rounded hover:bg-teal-500 transition"
                  >
                    +
                  </button>
                </div>
              )}



              {quantityInCart > 0 && (
                <p className="mt-1 text-sm text-green-400">In Cart: {quantityInCart}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
