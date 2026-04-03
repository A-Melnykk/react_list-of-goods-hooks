export const ProductList: React.FC<Props> = ({ products }) => (
  <ul className="list" data-cy="ProductList">
    {products.map(product => (
      <li key={product.id} data-cy="Good">
        {product.name}
      </li>
    ))}
  </ul>
);
