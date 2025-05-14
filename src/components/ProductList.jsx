const ProductList = ({ products, deleteProduct }) => {
  return (
    <div className="grid grid-cols-3 gap-6 mt-6">
      {products.map((product, index) => (
        <div key={index} className="border p-4 rounded-lg shadow-md">
          <img src={product.image} alt={product.name} className="w-full h-32 object-cover mb-2" />
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-gray-600">${product.price}</p>
          <button 
            onClick={() => deleteProduct(index)} 
            className="mt-2 w-full py-2 bg-red-600 text-white rounded-md">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;