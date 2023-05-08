import { body } from "express-validator";

import { fieldsValidation } from "../middlewares/fieldsValidations.js";

export const roleValidations = [
  body("role", "role is required").not().isEmpty(),
  fieldsValidation,
];
