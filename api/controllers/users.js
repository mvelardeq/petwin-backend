import { User } from "../models/users.js";
import bcrypt from "bcryptjs";

const getItem = async (req, res) => {
  const { id } = req.params;
  const users = await User.find({ _id: id });
  res.send(users);
};

const getItems = async (req, res) => {
  const { limit = 10 } = req.query;
  const { page = 1 } = req.query;
  const skip = (page - 1) * limit;
  const query = { state: true };

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(skip).limit(limit),
  ]);

  const pages = Math.ceil(total / limit);
  res.send({
    greetings: "hello",
    pagination: {
      last_visable_page: pages,
      has_next_page: pages > page,
      current_page: page,
      items: { count: limit, total, per_page: limit },
    },
    data: users,
  });
};

const createItem = async (req, res) => {
  const { google, ...others } = req.body;

  //encrypt password
  const salt = bcrypt.genSaltSync(10);
  others.password = bcrypt.hashSync(others.password, salt);

  //Save DB
  const user = await User.create(others);

  res.send(user);
};

const updateItem = async (req, res) => {
  const { id } = req.params;
  const { google, password, ...others } = req.body;

  if (password) {
    const salt = bcrypt.genSaltSync();
    others.password = bcrypt.hashSync(password, salt);
  }

  await User.findByIdAndUpdate(id, others);

  // const user = await User.findById(id)

  res.send({ id, others });
};

const deleteItem = async (req, res) => {
  const { id } = req.params;

  await User.findByIdAndUpdate(id, { state: false });

  res.send("user was deleted successfully");
};

export { getItem, getItems, createItem, updateItem, deleteItem };
