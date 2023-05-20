import { Router } from "express";

import {
  getItem,
  getItems,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/users.js";
import {
  createUserValidations,
  deleteUSerValisations,
  getUsersValidations,
  updateUserValidations,
} from "../validators/users.js";

export const router = Router();

router.get("/:id", getItem);
router.get("/", getUsersValidations, getItems);
router.post("/", createUserValidations, createItem);
router.put("/:id", updateUserValidations, updateItem);
router.delete("/:id", deleteUSerValisations, deleteItem);

// export default router;
