import Movie from '../models/movie.model';

// Get movie
export function getMovie(req, res) {
  // Searching for movie depending on movie Id
  Movie.findOne({ id: req.params.movieId }).exec((err, movie) => {
    if (err) {
      res.status(500).send(err);
    } else {
      // Sending found movie
      res.json([movie]);
    }
  });
}
