// Export Constants
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCREASE_THE_AMOUNT = 'INCREASE_THE_AMOUNT';
export const DECREASE_THE_AMOUNT = 'DECREASE_THE_AMOUNT';

// Export Actions
export function addToCart(product) {
  return {
    type: ADD_TO_CART,
    product,
    amount: 1,
  };
}
