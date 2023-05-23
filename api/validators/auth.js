import { check } from "express-validator";
import { fieldsValidation } from "../middlewares/fieldsValidations.js";

export const authValidator = [
  check("email", "Email must be valid!").isEmail(),
  check("password", "password is required!").not().isEmpty(),
  fieldsValidation,
];
