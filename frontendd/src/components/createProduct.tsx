import { useState, type FormEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct, type Product } from '../api';

export default function CreateProductForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (product: Product) => {
      return createProduct(product);
    },
    onMutate: async (newprod) => {
      await queryClient.cancelQueries({ queryKey: ['products'] });
      const prevProducts: any = queryClient.getQueryData(['products']);
      if (prevProducts) {
        queryClient.setQueryData(['products'], [
          ...prevProducts,
          { ...newprod }
        ]);
      }
      return { prevProducts };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }

  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      name,
      price: Number(price),
      stock: Number(stock),
    });
    setName('');
    setPrice('');
    setStock('');
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="max-w-md mx-auto mt-10 p-8 bg-gray-800 rounded-2xl shadow-2xl text-white"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Create Product</h2>

      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="input-field"
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        min={0}
        className="input-field"
      />

      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        required
        min={0}
        className="input-field"
      />

      <button
        type="submit"
        className="w-1/2 mx-auto block bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 py-2 rounded-lg shadow-lg text-white cursor-pointer transition-all duration-300"
      >
        Add Product
      </button>
    </form>

  );
}
