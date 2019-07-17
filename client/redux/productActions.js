// Export Constants
export const GET_MOVIES = 'GET_PRODUCTS';
export const SORT_ALPHABETICALLY = 'SORT_ALPHABETICALLY';
export const SORT_ALPHABETICALLY_REVERSED = 'SORT_ALPHABETICALLY_REVERSED';
export const SORT_BY_PRICE_ASCENDING = 'SORT_BY_PRICE_ASCENDING';
export const SORT_BY_PRICE_DESCENDING = 'SORT_BY_PRICE_DESCENDING';
export const SEARCH_FOR_MOVIES = 'SEARCH_FOR_MOVIES';
// Export Actions

export function getMovies(data) {
  return {
    type: GET_MOVIES,
    products: data,
  };
}
