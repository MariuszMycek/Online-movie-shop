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

// get Movies
export function getMovies(req, res) {
  const pageNumber = req.params.page;
  const nPerPage = 6 || 6;

  Promise.all([
    Movie.find()
      .sort(sortBy(req.params.sort_by))
      .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
      .limit(nPerPage)
      .exec(),
    Movie.find()
      .countDocuments()
      .exec(),
  ])
    .then(([movies, count]) => {
      res.json({ movies, count });
    })
    .catch(err => res.status(500).send(err));
}

export function searchMovies(req, res) {
  const pageNumber = req.params.page;
  const nPerPage = 6 || 6;
  const phrase = req.params.phrase;

  const sortParameter =
    req.params.sort_by === 'noSort'
      ? { score: { $meta: 'textScore' } }
      : sortBy(req.params.sort_by);

  Promise.all([
    Movie.find(
      { $text: { $search: phrase } },
      { score: { $meta: 'textScore' } }
    )
      .sort(sortParameter)
      .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
      .limit(nPerPage)
      .exec(),
    Movie.find(
      { $text: { $search: phrase } },
      { score: { $meta: 'textScore' } }
    )
      .countDocuments()
      .exec(),
  ])
    .then(([movies, count]) => {
      res.json({ movies, count });
    })
    .catch(err => res.status(500).send(err));
}
