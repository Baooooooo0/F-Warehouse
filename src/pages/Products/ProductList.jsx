import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/Table/Table';
import Button from '../../components/Button/Button';
import { productAPI } from '../../api/product.api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productAPI.getAll();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Price', accessor: 'price' },
    { header: 'Stock', accessor: 'stock' },
    {
      header: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline">Edit</Button>
          <Button size="sm" variant="danger">Delete</Button>
        </div>
      ),
    },
  ];

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <Button onClick={() => navigate('/products/create')}>Create Product</Button>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <Table columns={columns} data={products} />
      </div>
    </div>
  );
};

export default ProductList;
