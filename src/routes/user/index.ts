import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';
import {create, findAll} from '../../controllers/UserController'

const router = Router();

router.post("/create", validateRequest, create)
router.get("/", validateRequest, findAll)



export default router;
