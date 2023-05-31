import { request } from "express";
import { Pet } from "../models/pets.js";

const getItem = async (req, res) => {
  const { id } = req.params;
  const pet = await Pet.findById(id).populate("owner", "firstName");
  res.send(pet);
};

const getItems = async (req, res) => {
  const { limit = 10 } = req.query;
  const { page = 1 } = req.query;
  const skip = (page - 1) * limit;
  const query = { state: true };

  const [total, pets] = await Promise.all([
    Pet.countDocuments(query),
    Pet.find(query)
      .populate("owner", "firstName")
      .populate("breed", "name")
      .skip(skip)
      .limit(limit),
  ]);

  const pages = Math.ceil(total / limit);

  res.send({
    pagination: {
      total_pages: pages,
      has_next_page: pages > page,
      current_page: page,
      items: {
        count: pages > page ? limit : total - limit * (page - 1),
        total,
        per_page: limit,
      },
    },
    data: pets,
  });
};

const createItem = async (req = request, res) => {
  //Getting pet's owner
  const ownerPet = req.user;
  req.body.owner = ownerPet.id;

  //Save DB
  const breed = await Pet.create(req.body);

  res.send(breed);
};

const updateItem = async (req, res) => {
  const { id } = req.params;

  const { state, owner, ...data } = req.body;

  await Pet.findByIdAndUpdate(id, data);

  const pet = await Pet.findById(id);

  res.send(pet);
};

const deleteItem = async (req, res) => {
  const { id } = req.params;

  const pet = await Pet.findByIdAndUpdate(id, { state: false }, { new: true });

  res.send(pet);
};

export { getItem, getItems, createItem, updateItem, deleteItem };
