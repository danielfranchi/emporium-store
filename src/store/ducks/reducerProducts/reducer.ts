import { TypesProduct, arrayProductList } from './types';

const initialStateToken: arrayProductList = {
  arrayProduct: [],
};

function reducerProduct(state = initialStateToken, action: any) {
  switch (action.type) {
    case TypesProduct.GET_PRODUCTS:
      return {
        arrayProduct: action.payload,
      };

    default:
      return state;
  }
}

export default reducerProduct;
