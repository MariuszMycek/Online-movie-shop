import { Router } from 'express';
import * as HomeController from '../controllers/home.contoller';

const router = new Router();

router.route('/home/:sort_by/:page').search(HomeController.getMovies);

router.route('/home/:sort_by/:page/:phrase').search(HomeController.getMovies);

export default router;
