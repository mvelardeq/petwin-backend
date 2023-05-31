import { Router } from "express";
import {
  createItem,
  deleteItem,
  getItem,
  getItems,
  updateItem,
} from "../controllers/pets.js";
import {
  createPetValidations,
  deletePetValidations,
  getPetValidations,
  updatePetValidations,
} from "../validators/pets.js";

export const router = Router();

//Get Pets - public
router.get("/:id", getPetValidations, getItem);

//Get Pet by id - public
router.get("/", getItems);

//Create Pet - private - user with valid token and ADMIN_ROLE
router.post("/", createPetValidations, createItem);

//Update Pet - private - user with valid token and ADMIN_ROLE
router.put("/:id", updatePetValidations, updateItem);

//Delete Pet - private - user with valid token and SUPERADMIN_ROLE
router.delete("/:id", deletePetValidations, deleteItem);
