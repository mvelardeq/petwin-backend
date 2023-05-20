import { Role } from "../models/roles.js";
import { User } from "../models/users.js";

export const dbRoleValidator = async (role = "") => {
  const existRole = await Role.findOne({ role });

  if (!existRole) {
    throw new Error("This role is not support");
  }
};

export const dbEmailValidator = async (email = "") => {
  const existEmail = await User.findOne({ email });

  if (existEmail) {
    throw new Error("This email is used");
  }
};
export const dbIdValidator = async (id = "") => {
  const existId = await User.findById(id);

  if (!existId) {
    throw new Error("This Id doesn't exist");
  }
};

export const dbUpdateEmailValidator = async (newEmail = "", req) => {
  const { id } = req.params;
  const user = await User.findById(id);
  const currentEmail = user.email;

  if (currentEmail !== newEmail) {
    return dbEmailValidator(newEmail);
  }
};

export const isFieldANumber = (value) => {
  if (!value) return true;
  const limit = Number(value);
  if (isNaN(limit)) throw new Error("field is not a numnber");
  return true;
};
