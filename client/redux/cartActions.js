/* eslint-disable no-alert */

import callApi from '../util/apiCaller';

// Export Constants
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCREASE_THE_AMOUNT = 'INCREASE_THE_AMOUNT';
export const DECREASE_THE_AMOUNT = 'DECREASE_THE_AMOUNT';
export const SET_DISCOUNT = 'SET_DISCOUNT';
export const RESET_CART = 'RESET_CART';

// Export Actions
export function addToCart(product) {
  return {
    type: ADD_TO_CART,
    product,
    amount: 1,
  };
}

export function removeFromCart(product) {
  return {
    type: REMOVE_FROM_CART,
    product,
  };
}

export function increaseTheAmount(product) {
  return {
    type: INCREASE_THE_AMOUNT,
    product,
  };
}

export function decreaseTheAmount(product) {
  return {
    type: DECREASE_THE_AMOUNT,
    product,
  };
}

export function setDiscount(value) {
  return {
    type: SET_DISCOUNT,
    value,
  };
}

export function resetCart() {
  return {
    type: RESET_CART,
  };
}

export function getDiscount(value) {
  return dispatch => {
    // Checking if entered code is in DB
    return callApi(`discount/${value}`).then(res => {
      if (res === null) {
        // If not set discount in state to 0
        dispatch(setDiscount(0));
        // and display proper alert
        alert('Niestety podany kod nie jest poprawny');
      } else {
        // If code is correct set discount in state depending on server response
        dispatch(setDiscount(res.discount_value));
        // and display proper alert
        alert(`Kod poprawny!

      Przyznano rabat w wysokości ${res.discount_value}%`);
      }
    });
  };
}
