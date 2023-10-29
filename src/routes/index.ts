import { Router } from 'express';
import { Request, Response } from 'express';
import NotFoundError from '../errors/notFoundError';
import errorHandler from '../middlewares/errorHandler';

import user from "./user"

const router = Router();

router.get('/health', (req: Request, res: Response) => {
  res.send('Service status ok');
});

router.use('/users', user);

router.all('*', (req: Request) => {
  throw new NotFoundError(req.path);
});

router.use(errorHandler);

export default router;