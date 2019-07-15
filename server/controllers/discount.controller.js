import Discount from '../models/discount.model';

// Get movie
export function getDiscount(req, res) {
  Discount.findOne({ discount_code: req.params.discount_code }).exec(
    (err, discount) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(discount);
      }
    }
  );
}
