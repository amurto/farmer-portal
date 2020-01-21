  import React from 'react';

import ProductsList from './ProductsList';

const ProductsList = () => {
  const PRODUCTS = [
    {
      id: 'u1',
      name: 'Max Schwarz',
      image:
        'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      products: 3
    },
    {
      id: 'p1',
      title: 'Apple-Kashmiri',
      description: 'Very sweet',
      image:
        'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      quantity: 200,
      category: 'fruits & vegetables',
      type: 'veg',
      price: 40,
      fid: 'f1'
    }
  ];

  return <ProductsList items={PRODUCTS} />;
};

export default Products;