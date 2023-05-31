import { body, check } from "express-validator";

import { fieldsValidation } from "../middlewares/fieldsValidations.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import {
  isAdminRole,
  isSuperAdminRole,
} from "../middlewares/validate-roles.js";
import {
  dbExistBreed,
  dbNameBreedValidator,
  dbNameUpdateValidator,
} from "../helpers/db-validators.js";

export const getBreedValidations = [
  check("id", "It's not a mongo Id").isMongoId(),
  check("id").custom(dbExistBreed),
  fieldsValidation,
];

export const createBreedValidations = [
  validateJWT,
  isAdminRole,
  body("name", "name is required").not().isEmpty(),
  body("name").custom(dbNameBreedValidator),
  body("description", "description is required").not().isEmpty(),
  fieldsValidation,
];

export const updateBreedValidations = [
  validateJWT,
  isAdminRole,
  check("id", "It's not a mongo Id").isMongoId(),
  check("id").custom(dbExistBreed),
  body("name", "name is required").not().isEmpty(),
  check("name").custom(dbNameUpdateValidator),
  body("description", "description is required").not().isEmpty(),
  fieldsValidation,
];

export const deleteBreedValidations = [
  validateJWT,
  isSuperAdminRole,
  check("id", "It's not a mongo Id").isMongoId(),
  check("id").custom(dbExistBreed),
];
