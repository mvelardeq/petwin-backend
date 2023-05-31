import { request } from "express";
import { Breed } from "../models/breeds.js";

//Get breeds - public
const getItem = async (req, res) => {
  const { id } = req.params;
  const breed = await Breed.find({ _id: id }).populate("user", "firstName");
  res.send(breed);
};

//Get breed by id - public
const getItems = async (req, res) => {
  const { limit = 10 } = req.query;
  const { page = 1 } = req.query;
  const skip = (page - 1) * limit;
  const query = { state: true };

  const [total, breeds] = await Promise.all([
    Breed.countDocuments(query),
    Breed.find(query).populate("user", "firstName").skip(skip).limit(limit),
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
    data: breeds,
  });
};

//Create breed - private - all user who has valid token
const createItem = async (req = request, res) => {
  //Transform name of breed field to uppercase
  req.body.name = req.body.name.toUpperCase();

  //Getting user who make new breed
  const userAuthenticated = req.user;
  req.body.user = userAuthenticated.id;

  //Save DB
  const breed = await Breed.create(req.body);

  res.send(breed);
};

//Update breed - private - all user who has valid token
const updateItem = async (req, res) => {
  const { id } = req.params;

  const { state, user, ...data } = req.body;

  data.name = data.name.toUpperCase();
  data.user = req.user.id;

  await Breed.findByIdAndUpdate(id, data);

  const breed = await Breed.findById(id);

  res.send(breed);
};

//Delete breed - private - only ADMIN_ROLE
const deleteItem = async (req, res) => {
  const { id } = req.params;

  const breed = await Breed.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.send(breed);
};

export { getItem, getItems, createItem, updateItem, deleteItem };
