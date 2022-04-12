import { Router, Request, Response, response } from 'express';
import welcomeController from '../controller/welcome.controller';

const welcomeRouter = Router();

welcomeRouter.get('/', welcomeController.getAll);

welcomeRouter.get('/:id', welcomeController.getOne);

welcomeRouter.post('/', welcomeController.add);

welcomeRouter.delete('/:id', welcomeController.del);

export default welcomeRouter;