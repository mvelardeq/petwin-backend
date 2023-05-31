import { body, check } from "express-validator";

import { fieldsValidation } from "../middlewares/fieldsValidations.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { isSuperAdminRole } from "../middlewares/validate-roles.js";
import { dbExistPet, isOwnerPet } from "../helpers/db-validators.js";

export const getPetValidations = [
  check("id", "It's not a mongo Id").isMongoId(),
  check("id").custom(dbExistPet),
  fieldsValidation,
];

export const createPetValidations = [
  validateJWT,
  body("name", "name is required").not().isEmpty(),
  fieldsValidation,
];

export const updatePetValidations = [
  validateJWT,
  check("id", "It's not a mongo Id").isMongoId(),
  check("id").custom(dbExistPet),
  check("id").custom(isOwnerPet),
  body("name", "name is required").not().isEmpty(),
  fieldsValidation,
];

export const deletePetValidations = [
  validateJWT,
  isSuperAdminRole,
  check("id", "It's not a mongo Id").isMongoId(),
  check("id").custom(dbExistPet),
];
