import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers } from 'redux';

import reducerProduct from './ducks/reducerProducts/reducer';

const createRootReducer = () =>
  combineReducers({
    product: reducerProduct,
  });

const store = createStore(createRootReducer(), composeWithDevTools());

export { store };
