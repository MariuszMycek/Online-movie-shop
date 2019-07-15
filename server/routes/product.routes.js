import { Router } from 'express';
import * as ProductController from '../controllers/product.contoller';

const router = new Router();

router.route('/product/:movieId').get(ProductController.getMovie);

export default router;
