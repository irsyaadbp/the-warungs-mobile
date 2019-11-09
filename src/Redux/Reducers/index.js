import {combineReducers} from 'redux';

import auth from './auth';
import order from './order';
import category from './category';
import product from './product';

const appReducer = combineReducers({
  auth,
  order,
  category,
  product,
});

export default appReducer;
