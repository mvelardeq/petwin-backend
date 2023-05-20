import { body, check, query } from "express-validator";

import { fieldsValidation } from "../middlewares/fieldsValidations.js";
import {
  dbEmailValidator,
  dbIdValidator,
  dbRoleValidator,
  dbUpdateEmailValidator,
  isFieldANumber,
} from "../helpers/db-validators.js";

export const createUserValidations = [
  body("firstName", "firstName is required!").not().isEmpty(),
  body("lastName", "lastName is required!").not().isEmpty(),
  body("password", "password must be at least 6 characters!").isLength({
    min: 6,
  }),
  body("email", "Email invalid!").isEmail(),
  body("email").custom(dbEmailValidator),
  body("role").custom(dbRoleValidator),
  fieldsValidation,
];

export const updateUserValidations = [
  check("id", "No es un id válido").isMongoId(),
  check("id").custom(dbIdValidator),
  body("email", "Email invalid!").isEmail(),
  body("email").custom((value, { req }) => dbUpdateEmailValidator(value, req)),
  body("role").custom(dbRoleValidator),
  fieldsValidation,
];

export const getUsersValidations = [
  check("limit").custom(isFieldANumber),
  check("page").custom(isFieldANumber),
  fieldsValidation,
];

export const deleteUSerValisations = [
  check("id", "No es un id válido").isMongoId(),
  check("id").custom(dbIdValidator),
  fieldsValidation,
];
