// Export Constants
export const SET_SORT_TYPE = 'SET_SORT_TYPE';

// Export Actions

export function setSortType(sortType = 'name_asc') {
  return {
    type: SET_SORT_TYPE,
    sortType,
  };
}
