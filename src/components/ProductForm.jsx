import React, { useState } from 'react';

// ProductForm component
const ProductForm = ({ addProduct }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

   // Declare newProduct correctly
  const newProduct = { name, price, image };
  
  console.log("Submitting product:", newProduct); // ✅ Log here

  addProduct(newProduct); // Call to addProduct function

  setName('');
  setPrice('');
  setImage('');
};

  return (
    
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Product Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      



      
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Product Price
        </label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Product Image URL
        </label>
        <input
          id="image"
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      
      <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md">
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;
