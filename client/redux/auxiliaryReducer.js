import {
  SET_SORT_TYPE,
  SET_SEARCHED_PHRASE,
  RESET_SEARCHED_PHRASE,
} from './auxiliaryActions';

// Initial State
const initialState = { sortType: '', searchedPhrase: '' };

export default function auxiliary(state = initialState, action) {
  switch (action.type) {
    case SET_SORT_TYPE:
      return { ...state, sortType: action.sortType };

    case SET_SEARCHED_PHRASE:
      return { ...state, searchedPhrase: action.phrase};

    case RESET_SEARCHED_PHRASE:
      return { ...state, searchedPhrase: '' };

    default:
      return state;
  }
}
