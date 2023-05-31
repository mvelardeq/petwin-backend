import { Breed } from "../models/breeds.js";
import { Pet } from "../models/pets.js";
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

//BREEDS VALITIONS
export const dbNameBreedValidator = async (name = "") => {
  const exitsNameBreed = await Breed.findOne({ name: name.toUpperCase() });
  console.log(name.toUpperCase());
  console.log(exitsNameBreed);

  if (exitsNameBreed) {
    throw new Error("This name of breed is used");
  }
};

export const dbExistBreed = async (id = "") => {
  const existBreed = await Breed.findById(id);
  if (!existBreed) {
    throw new Error("this breed doesn't exist");
  }
};

export const dbNameUpdateValidator = async (name = "", { req }) => {
  const { id } = req.params;
  const breed = await Breed.findById(id);
  const currentName = breed.name;

  if (currentName !== name.toUpperCase()) {
    return dbNameBreedValidator(name);
  }
};

//PETS Validators
export const dbExistPet = async (id = "") => {
  const existPet = await Pet.findById(id);
  if (!existPet) {
    throw new Error("this pet doesn't exist");
  }
};
export const isOwnerPet = async (id = "", { req }) => {
  const pet = await Pet.findById(id);
  const userAuthenticated = req.user;
  if (userAuthenticated.id !== pet.owner) {
    throw new Error("You try to update a pet with inavlid owner");
  }
};
