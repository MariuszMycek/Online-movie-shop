import Movie from '../models/movie.model';

export function getCategories(req, res) {
  Promise.all([Movie.distinct('release_year'), Movie.distinct('genres_data')])
    .then(([years, genres]) => {
      const unsortedYears = [...years];
      const sortedYears = unsortedYears.sort((a, b) => a - b);
      const newGenres = [...genres];
      return [sortedYears, newGenres];
    })
    .then(([years, genres]) => res.json({ years, genres }));
}
