import Movie from '../models/movie.model';

// Get movie
export function getMovie(req, res) {
  Movie.findOne({ id: req.params.movieId }).exec((err, movie) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json([movie]);
    }
  });
}
