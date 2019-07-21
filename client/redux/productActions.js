// Export Constants
export const GET_MOVIES = 'GET_PRODUCTS';

// Export Actions
export function getMovies(data) {
  return {
    type: GET_MOVIES,
    products: data,
  };
}
