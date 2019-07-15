import { Router } from 'express';
import * as DiscountController from '../controllers/discount.controller';

const router = new Router();

router.route('/discount/:discount_code').get(DiscountController.getDiscount);

export default router;
