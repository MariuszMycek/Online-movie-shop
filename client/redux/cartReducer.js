import { ADD_TO_CART } from './cartActions';

// Initial State
const initialState = [];

export default function cart(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      return [...state, { product: action.product, amount: action.amount }];
    }

    default:
      return state;
  }
}
