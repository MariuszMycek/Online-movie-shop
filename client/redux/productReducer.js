import { GET_MOVIES } from './productActions';

// Initial State
const initialState = [];

export default function movies(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES: {
      return [...action.products];
    }

    default:
      return state;
  }
}
