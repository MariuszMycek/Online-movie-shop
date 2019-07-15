import { Router } from 'express';
import * as HomeController from '../controllers/home.contoller';

const router = new Router();

router.route('/home/:sort_by/:page').get(HomeController.getMovies);

router.route('/home/:sort_by/:page/:phrase').get(HomeController.searchMovies);

export default router;
