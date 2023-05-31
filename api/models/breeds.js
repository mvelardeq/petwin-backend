import { Schema, model } from "mongoose";

const BreedSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Name is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  state: {
    type: Boolean,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

BreedSchema.methods.toJSON = function () {
  const { __v, state, ...breed } = this.toObject();
  return breed;
};

export const Breed = model("Breed", BreedSchema);
