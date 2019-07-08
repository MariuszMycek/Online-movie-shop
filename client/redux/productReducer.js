import {
  GET_MOVIES,
  SORT_ALPHABETICALLY,
  SORT_ALPHABETICALLY_REVERSED,
  SORT_BY_PRICE_ASCENDING,
  SORT_BY_PRICE_DESCENDING,
} from './productActions';

// universal sorting function
/* array - array to sort (f.e. state), 
 sortingElement - element of the object which is sorting criterion (f.e. price),
 sortingType - ascending/descending (ascending is default and may be omited as argument) */
function sortArray(array, sortingElement, sortingType) {
  const movies = [...array];
  const elementsToSort = movies.map(movie => {
    return movie[sortingElement];
  });
  const sortMethod = () => {
    if (sortingElement === 'price') {
      return (a, b) => a - b;
    }
    return;
  };
  const sortedElements = elementsToSort.sort(sortMethod());
  const sortedMovies = sortedElements.map(element => {
    let movieAfterSort;
    movies.forEach(movie => {
      if (element === movie[sortingElement]) {
        movieAfterSort = movie;
      }
    });
    return movieAfterSort;
  });

  if (sortingType === 'descending') {
    const sortedMoviesReversed = sortedMovies.reverse();
    return [...sortedMoviesReversed];
  }

  return [...sortedMovies];
}

// Initial State
const initialState = [];

export default function products(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES: {
      return [...action.products];
    }

    case SORT_ALPHABETICALLY: {
      const sortedMovies = sortArray(state, 'original_title');

      return [...sortedMovies];
    }

    case SORT_ALPHABETICALLY_REVERSED: {
      const sortedMovies = sortArray(state, 'original_title', 'descending');

      return [...sortedMovies];
    }

    case SORT_BY_PRICE_ASCENDING: {
      const sortedMovies = sortArray(state, 'price');

      return [...sortedMovies];
    }

    case SORT_BY_PRICE_DESCENDING: {
      const sortedMovies = sortArray(state, 'price', 'descending');

      return [...sortedMovies];
    }
    default:
      return state;
  }
}
