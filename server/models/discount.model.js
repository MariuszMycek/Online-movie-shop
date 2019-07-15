import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const discountSchema = new Schema({
  discount_code: String,
  discount_value: Number,
});

export default mongoose.model('Discount', discountSchema);
