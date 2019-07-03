/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import movies from '../components/ProductList/ProductListReducer';
import sortType from '../components/SortMenu/SortMenuReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  movies,
  sortType,
});
