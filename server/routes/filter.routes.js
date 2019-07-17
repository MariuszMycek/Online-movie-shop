import { Router } from 'express';
import * as FilterController from '../controllers/filter.controller';

const router = new Router();

router.route('/filter/').get(FilterController.getCategories);

export default router;
