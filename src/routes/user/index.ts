import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';
import {create, findAll, findById, remove} from '../../controllers/UserController'

const router = Router();

router.post("/create", validateRequest, create)
router.get("/", validateRequest, findAll)
router.get("/:id",validateRequest, findById)
router.delete("/:id", validateRequest, remove)


export default router;
