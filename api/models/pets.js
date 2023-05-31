import { Schema, model } from "mongoose";

const PetSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  breed: {
    type: Schema.Types.ObjectId,
    ref: "Breed",
    required: [true, "Breed is required"],
  },
  state: {
    type: Boolean,
    default: true,
  },
  profilePhoto: {
    type: String,
  },
  food: [
    {
      type: Schema.Types.ObjectId,
      ref: "Food",
    },
  ],
  birthdate: {
    type: Date,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

PetSchema.methods.toJSON = function () {
  const { __v, state, ...pet } = this.toObject();
  return pet;
};

export const Pet = model("Pet", PetSchema);
