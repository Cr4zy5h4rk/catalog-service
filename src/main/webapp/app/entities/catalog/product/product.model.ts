import { ICategory } from 'app/entities/catalog/category/category.model';

export interface IProduct {
  id: number;
  name?: string | null;
  price?: number | null;
  stock?: number | null;
  category?: ICategory | null;
}

export type NewProduct = Omit<IProduct, 'id'> & { id: null };
