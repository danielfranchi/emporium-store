import { action } from 'typesafe-actions';
import { TypesProduct, arrayProductList } from './types';

export const getProducts = (payload: arrayProductList) =>
  action(TypesProduct.GET_PRODUCTS, payload);
