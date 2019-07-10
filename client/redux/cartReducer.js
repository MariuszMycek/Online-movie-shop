import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREASE_THE_AMOUNT,
  DECREASE_THE_AMOUNT,
  SET_DISCOUNT,
  RESET_CART,
} from './cartActions';

// Initial State
const initialState = { products: [], discount: 0 };

export default function cart(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const products = [
        ...state.products,
        { product: action.product, amount: action.amount },
      ];
      return { ...state, products };
    }
    case REMOVE_FROM_CART: {
      const products = [...state.products];
      const newProducts = products.filter(
        item => item.product.id !== action.product.id
      );
      console.log(newProducts);
      return { ...state, products: [...newProducts] };
    }

    case INCREASE_THE_AMOUNT: {
      const products = [...state.products];
      const newProducts = products.map(item => {
        if (item.product.id === action.product.id) {
          item.amount++;
        }
        return item;
      });
      return { ...state, products: [...newProducts] };
    }

    case DECREASE_THE_AMOUNT: {
      const products = [...state.products];
      const newProducts = products.map(item => {
        if (item.product.id === action.product.id) {
          item.amount--;
        }
        return item;
      });
      return { ...state, products: [...newProducts] };
    }

    case SET_DISCOUNT:
      return { ...state, discount: action.value };

    case RESET_CART:
      return { ...initialState };

    default:
      return state;
  }
}
