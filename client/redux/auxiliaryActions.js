// Export Constants
export const SET_SORT_TYPE = 'SET_SORT_TYPE';
export const SET_SEARCHED_PHRASE = 'SET_SEARCHED_PHRASE';
export const RESET_SEARCHED_PHRASE = 'RESET_SEARCHED_PHRASE';
export const SET_RESULT_COUNT = 'SET_RESULT_COUNT';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_FILTERS = 'SET_FILTERS';
export const RESET_FILTER = 'RESET_FILTER';

// Export Actions
export function setSortType(sortType = 'created_at_desc') {
  return {
    type: SET_SORT_TYPE,
    sortType,
  };
}

export function setSearchedPhrase(phrase = '') {
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

export function setResultCount(count) {
  return {
    type: SET_RESULT_COUNT,
    count,
  };
}

export function setCategories(years, genres) {
  return {
    type: SET_CATEGORIES,
    years,
    genres,
  };
}

export function setFilters(filters) {
  return {
    type: SET_FILTERS,
    filters,
  };
}

export function resetFilter(filter) {
  return {
    type: RESET_FILTER,
    filter,
  };
}
