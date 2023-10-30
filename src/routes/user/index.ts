import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';
import {create, findAll, findById} from '../../controllers/UserController'

const router = Router();

router.post("/create", validateRequest, create)
router.get("/", validateRequest, findAll)
router.get("/:id",validateRequest, findById)



export default router;
