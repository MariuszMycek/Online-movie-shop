/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import movies from './productReducer';
import sortType from './auxiliaryReducer';
import cart from './cartReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  movies,
  sortType,
  cart
});
