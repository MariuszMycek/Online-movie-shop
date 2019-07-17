import {
  SET_SORT_TYPE,
  SET_SEARCHED_PHRASE,
  RESET_SEARCHED_PHRASE,
  SET_RESULT_COUNT,
  SET_CATEGORIES,
  SET_FILTERS,
  RESET_FILTER,
} from './auxiliaryActions';

// Initial State
const initialState = {
  sortType: '',
  searchedPhrase: '',
  resultCount: 0,
  yearFilter: [],
  genreFilter: [],
};

export default function auxiliary(state = initialState, action) {
  switch (action.type) {
    case SET_SORT_TYPE:
      return { ...state, sortType: action.sortType };

    case SET_SEARCHED_PHRASE:
      return { ...state, searchedPhrase: action.phrase };

    case RESET_SEARCHED_PHRASE:
      return { ...state, searchedPhrase: initialState.searchedPhrase };

    case SET_RESULT_COUNT:
      return { ...state, resultCount: action.count };

    case SET_CATEGORIES:
      return {
        ...state,
        yearsCategories: [...action.years],
        genresCategories: [...action.genres],
      };

    case SET_FILTERS:
      return {
        ...state,
        yearFilter: action.filters.yearFilter,
        genreFilter: action.filters.genreFilter,
      };

    case RESET_FILTER:
      return {
        ...state,
        [action.filter]: initialState[action.filter],
      };

    default:
      return state;
  }
}
