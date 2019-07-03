import { SET_SORT_TYPE } from './SortMenuActions';

// Initial State
const initialState = 'name_asc';

export default function products(state = initialState, action) {
  switch (action.type) {
    case SET_SORT_TYPE: {
      return action.sortType;
    }

    default:
      return state;
  }
}
