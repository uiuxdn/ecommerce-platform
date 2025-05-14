import React, { useState, useEffect } from 'react';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(''); // Added search state

  // Fetch products from API on mount
  useEffect(() => {
    fetch('http://localhost:5001/products')
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data].reverse(); // newest first
        setProducts(sorted);
      });
  }, []);

  // Filter products based on search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // Add product to API + state
  const addProduct = (product) => {
    fetch('http://localhost:5001/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((newProduct) => setProducts([newProduct, ...products]));
  };

  // Delete product from API + state
  const deleteProduct = (id) => {
    fetch(`http://localhost:5001/products/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setProducts(products.filter((p) => p.id !== id));
    });
  };

  //return values 
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-center mb-6">Admin Dashboard</h1>

      {/* Flex container for form and product list */}
      <div className="flex h-[80vh] overflow-hidden gap-6">
        {/* Fixed Form */}
        <div className="w-1/2 overflow-y-auto">
          <ProductForm addProduct={addProduct} />
        </div>

        {/* Product list on the right */}
        <div className="w-1/2 overflow-y-auto pr-2">
          <h2 className="text-xl font-semibold mb-4">Product List</h2>

          {/* Search Bar moved to the list section */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search products"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border rounded-md w-full"
            />
          </div>

          <div className="h-[500px] overflow-y-auto grid grid-cols-2 gap-4">
            {/* Filtered and mapped products */}
            {filteredProducts.map((product) => (
              <div key={product.id} className="border p-4 rounded-lg shadow-md relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover mb-2"
                />
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>

                {/* Delete button */}
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="absolute top-2 right-2 text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
