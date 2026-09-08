import { IProduct, NewProduct } from './product.model';

export const sampleWithRequiredData: IProduct = {
  id: 11737,
  name: 'hm sleepily',
  price: 17510.56,
  stock: 1843,
};

export const sampleWithPartialData: IProduct = {
  id: 23028,
  name: 'or now',
  price: 15873.02,
  stock: 25953,
};

export const sampleWithFullData: IProduct = {
  id: 4403,
  name: 'cafe',
  price: 21233.3,
  stock: 2026,
};

export const sampleWithNewData: NewProduct = {
  name: 'anti inject why',
  price: 26562.23,
  stock: 4718,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
