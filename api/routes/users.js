import { Router } from "express";

import {getItem, getItems, createItem, updateItem, deleteItem} from '../controllers/users.js'
import { userValidations } from "../validators/users.js";

export const router = Router();

router.get("/:id", getItem);
router.get("/", getItems);
router.post(  "/",  userValidations,  createItem);
router.put("/", updateItem);
router.delete("/", deleteItem);

// export default router;
