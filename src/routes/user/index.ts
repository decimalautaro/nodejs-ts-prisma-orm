import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';
import {create, findAll, findById, remove, update} from '../../controllers/UserController'

const router = Router();

router.post("/create", validateRequest, create)
router.get("/", validateRequest, findAll)
router.get("/:id",validateRequest, findById)
router.delete("/remove/:id", validateRequest, remove)
router.put("/update/:id", validateRequest, update)



export default router;
