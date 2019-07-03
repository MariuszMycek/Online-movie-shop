import { SET_SORT_TYPE } from './SortMenuActions';

// Initial State
const initialState = '';

export default function sortType(state = initialState, action) {
  switch (action.type) {
    case SET_SORT_TYPE: {
      return action.sortType;
    }

    default:
      return state;
  }
}
