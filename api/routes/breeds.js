import { Router } from "express";
import {
  createItem,
  deleteItem,
  getItem,
  getItems,
  updateItem,
} from "../controllers/breeds.js";
import {
  createBreedValidations,
  deleteBreedValidations,
  getBreedValidations,
  updateBreedValidations,
} from "../validators/breeds.js";

export const router = Router();

//Get breeds - public
router.get("/:id", getBreedValidations, getItem);

//Get breed by id - public
router.get("/", getItems);

//Create breed - private - user with valid token and ADMIN_ROLE
router.post("/", createBreedValidations, createItem);

//Update breed - private - user with valid token and ADMIN_ROLE
router.put("/:id", updateBreedValidations, updateItem);

//Delete breed - private - user with valid token and SUPERADMIN_ROLE
router.delete("/:id", deleteBreedValidations, deleteItem);
