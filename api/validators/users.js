import { body } from "express-validator";

import { fieldsValidation } from "../middlewares/fieldsValidations.js";
import { Role } from "../models/roles.js";

export const userValidations = [
  body("firstName", "firstName is required!").not().isEmpty(),
  body("lastName", "lastName is required!").not().isEmpty(),
  body("password", "password is required!").not().isEmpty(),
  body("password", "password must be at leas 6 characters!").isLength({min:6}),
  body("email", "Email invalid!").isEmail(),
  body("role", "this role is not supported").custom(async (role) => {
    const existRole = await Role.findOne({ role });
    if (!existRole) {
      throw new Error("This role is not support");
    }
  }),
  fieldsValidation,
];
