import React, { useState } from 'react';
import './App.scss';
import { Product, SortType } from './types';
import { ProductList } from './ProductList';

const initialProducts: Product[] = [
  { id: 1, name: 'Garlic', price: 8 },
  { id: 2, name: 'Dumplings', price: 12 },
  { id: 3, name: 'Carrot', price: 9 },
  { id: 4, name: 'Apple', price: 5 },
  { id: 5, name: 'Eggs', price: 11 },
  { id: 6, name: 'Ice cream', price: 4 },
  { id: 7, name: 'Beer', price: 7 },
  { id: 8, name: 'Fish', price: 15 },
  { id: 9, name: 'Milk', price: 6 },
  { id: 10, name: 'Bread', price: 3 },
];

export const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [sortBy, setSortBy] = useState<SortType>(SortType.Default);

  const reverseProducts = () => {
    setProducts(prev => [...prev].reverse());
  };

  const getSortedProducts = () => {
    const sorted = [...products];

    if (sortBy === SortType.Price) {
      sorted.sort((a, b) => a.price - b.price);
    }

    return sorted;
  };

  const visibleProducts = getSortedProducts();

  return (
    <div className="section">
      <h1 className="title">List of goods</h1>

      <div className="buttons">
        <button
          type="button"
          className="button is-success"
          onClick={reverseProducts}
        >
          Reverse
        </button>

        <button
          type="button"
          className={`button ${sortBy === SortType.Price ? 'is-info' : 'is-light'}`}
          onClick={() =>
            setSortBy(
              sortBy === SortType.Price ? SortType.Default : SortType.Price,
            )
          }
        >
          Sort by price
        </button>
      </div>

      <ProductList products={visibleProducts} />
    </div>
  );
};
