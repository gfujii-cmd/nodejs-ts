import { Router } from 'express';
import welcomeRouter from './welcome.route';

const routes = Router();

routes.use('/welcome', welcomeRouter);

export default routes;