import { getProducts } from './productActions';

// Export Constants
export const SET_SORT_TYPE = 'SET_SORT_TYPE';
export const SET_SEARCHED_PHRASE = 'SET_SEARCHED_PHRASE';
export const RESET_SEARCHED_PHRASE = 'RESET_SEARCHED_PHRASE';

// Export Actions

export function setSortType(sortType = 'name_asc') {
  return {
    type: SET_SORT_TYPE,
    sortType,
  };
}

export function setSearchedPhrase(phrase) {
  return {
    type: SET_SEARCHED_PHRASE,
    phrase,
  };
}

export function resetSearchedPhrase() {
  return {
    type: RESET_SEARCHED_PHRASE,
  };
}
