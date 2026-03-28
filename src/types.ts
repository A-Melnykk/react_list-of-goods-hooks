export enum SortType {
  Default = 'default',
  Name = 'name',
  Price = 'price',
}

export interface Product {
  id: number;
  name: string;
  price: number;
}
