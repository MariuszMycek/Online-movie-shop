import Movie from '../models/movie.model';

// Sorting function
const sortBy = sortType => {
  switch (sortType) {
    case 'name_asc':
      return { original_title: 'asc' };
    case 'name_desc':
      return { original_title: 'desc' };
    case 'price_asc':
      return { price: 'asc' };
    case 'price_desc':
      return { price: 'desc' };
    case 'by_score':
      return { score: { $meta: 'textScore' } };
    default:
      return { created_at: 'desc' };
  }
};

// Filters
const yearFilter = yearsArray => {
  return {
    $or: yearsArray.map(year => {
      return {
        release_year: year,
      };
    }),
  };
};

const genreFilter = genreArray => {
  return {
    $or: genreArray.map(genre => {
      return {
        genres_data: genre,
      };
    }),
  };
};

// query
const query = (yearsArray, genresArray, searchedPhrase) => {
  const phraseFilter = searchedPhrase
    ? { $text: { $search: searchedPhrase } }
    : {};

  if (yearsArray.length > 0 && genresArray.length === 0) {
    return {
      $and: [yearFilter(yearsArray), phraseFilter],
    };
  }
  if (genresArray.length > 0 && yearsArray.length === 0) {
    return {
      $and: [genreFilter(genresArray), phraseFilter],
    };
  }
  if (genresArray.length > 0 && yearsArray.length > 0) {
    return {
      $and: [yearFilter(yearsArray), genreFilter(genresArray), phraseFilter],
    };
  }
  return phraseFilter;
};

// get Movies
export function getMovies(req, res) {
  const { page, phrase, sort_by } = req.params;

  const nPerPage = 6 || 6;

  const { years = [], genres = [] } = req.body;

  Promise.all([
    Movie.find(query(years, genres, phrase))
      .sort(sortBy(sort_by))
      .skip(page > 0 ? (page - 1) * nPerPage : 0)
      .limit(nPerPage)
      .exec(),
    Movie.find(query(years, genres, phrase))
      .countDocuments()
      .exec(),
  ])
    .then(([movies, count]) => {
      res.json({ movies, count });
    })
    .catch(err => res.status(500).send(err));
}
