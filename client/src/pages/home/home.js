import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/productCard/productCard';
import { fetchProducts } from '../../api/products';

import './home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const items = await fetchProducts();
        setProducts(items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='product_list'>
      <h1 className='product_list_title'>Product List</h1>
      <div className='product_list_grid'>
        {products.map((product, key) => (
          <ProductCard key={key} data={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
