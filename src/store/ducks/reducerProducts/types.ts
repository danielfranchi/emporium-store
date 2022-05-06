export enum TypesProduct {
  GET_PRODUCTS = 'GET_PRODUCTS',
}

export interface ItemProduct {
  _id: string;
  name: string;
  description: string;
  value: number;
  img: string;
  qtd: number;
  total?: number;
}

export interface arrayProductList {
  arrayProduct: ItemProduct[];
}

export interface ReducerProduct {
  product: arrayProductList;
}
