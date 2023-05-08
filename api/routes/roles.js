import { Router } from "express";

import {getItem, getItems, createItem, updateItem, deleteItem} from '../controllers/roles.js'
import { roleValidations } from "../validators/roles.js";

export const router = Router();

router.get("/:id", getItem);
router.get("/", getItems);
router.post(  "/",  roleValidations,  createItem);
router.put("/", updateItem);
router.delete("/", deleteItem);

// export default router;
