// import data from '../../data.json';
import callApi from '../util/apiCaller';
import { setResultCount } from '../redux/auxiliaryActions';

// Export Constants
export const GET_MOVIES = 'GET_PRODUCTS';
export const SORT_ALPHABETICALLY = 'SORT_ALPHABETICALLY';
export const SORT_ALPHABETICALLY_REVERSED = 'SORT_ALPHABETICALLY_REVERSED';
export const SORT_BY_PRICE_ASCENDING = 'SORT_BY_PRICE_ASCENDING';
export const SORT_BY_PRICE_DESCENDING = 'SORT_BY_PRICE_DESCENDING';
export const SEARCH_FOR_MOVIES = 'SEARCH_FOR_MOVIES';
// Export Actions

export function getProducts(data) {
  return {
    type: GET_MOVIES,
    products: data,
  };
}

export function fetchData(sortBy = 'noSort', page = 1, phrase = '') {
  return dispatch => {
    return callApi(`home/${sortBy}/${page}/${phrase}`).then(res => {
      dispatch(getProducts(res.movies));
      dispatch(setResultCount(res.count));
    });
  };
}

export function getMovie(productId) {
  return dispatch => {
    return callApi(`product/${productId}`).then(res => {
      dispatch(getProducts(res));
    });
  };
}
