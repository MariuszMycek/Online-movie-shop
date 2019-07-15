import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  original_title: { type: String, required: true },
  overview: String,
  poster_path: String,
  genres_data: mongoose.Mixed,
  time_str: String,
  price: Number,
  release_year: String,
  created_at: Date,
  updated_at: Date,
});

movieSchema.pre('save', function(next) { // eslint-disable-line
  const currentDate = new Date(); // eslint-disable-line

  this.updated_at = currentDate;

  if (!this.created_at) {
    this.created_at = currentDate;
  }

  next();
});

export default mongoose.model('Movie', movieSchema);
