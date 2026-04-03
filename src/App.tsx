import React, { useState, useMemo } from 'react';
import { Product, SortType } from './types';
import './App.scss';

const initialProducts: Product[] = [
  { id: 1, name: 'Dumplings', price: 12 },
  { id: 2, name: 'Garlic', price: 8 },
  { id: 3, name: 'Carrot', price: 9 },
  { id: 4, name: 'Apple', price: 5 },
  { id: 5, name: 'Eggs', price: 11 },
  { id: 6, name: 'Fish', price: 15 },
  { id: 7, name: 'Beer', price: 7 },
  { id: 8, name: 'Milk', price: 6 },
  { id: 9, name: 'Ice cream', price: 4 },
  { id: 10, name: 'Bread', price: 3 },
];

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  const visibleProducts = useMemo(() => {
    const filtered = [...initialProducts].filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase().trim()),
    );

    if (sortBy === SortType.Name) {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === SortType.Length) {
      filtered.sort((a, b) => a.name.length - b.name.length);
    }

    if (isReversed) {
      filtered.reverse();
    }

    return filtered;
  }, [query, sortBy, isReversed]);

  const reset = () => {
    setQuery('');
    setSortBy(SortType.Default);
    setIsReversed(false);
  };

  return (
    <div className="container mt-5">
      <h1 className="title">List of Goods</h1>

      <div className="field">
        <label className="label" htmlFor="search-query">
          Search
        </label>
        <div className="control">
          <input
            id="search-query"
            data-cy="NameFilter"
            type="text"
            className="input"
            placeholder="Type name..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="buttons">
        <button
          type="button"
          className={`button ${sortBy === SortType.Name ? 'is-info' : 'is-light'}`}
          onClick={() =>
            setSortBy(
              sortBy === SortType.Name ? SortType.Default : SortType.Name,
            )
          }
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button ${sortBy === SortType.Length ? 'is-info' : 'is-light'}`}
          onClick={() =>
            setSortBy(
              sortBy === SortType.Length ? SortType.Default : SortType.Length,
            )
          }
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button ${isReversed ? 'is-info' : 'is-light'}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(query || sortBy !== SortType.Default || isReversed) && (
          <button type="button" className="button is-danger" onClick={reset}>
            Reset
          </button>
        )}
      </div>

      <table className="table is-fullwidth is-striped mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {visibleProducts.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td data-cy="Good">{product.name}</td>
              <td>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
