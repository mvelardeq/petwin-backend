import {Role} from '../models/roles.js'


const getItem = async(req, res) => {
  const {id} = req.params
    const roles = await Role.find({_id:id})
  res.send(roles);
};

const getItems = async(req, res) => {
    const users = await Role.find()
  res.send(users);
};

const createItem = async(req, res) => {

  //Save DB
  const role = await Role.create(req.body);

  res.send(role);
};

const updateItem = (req, res) => {
  res.send("update item from controller");
};

const deleteItem = (req, res) => {
  res.send("delete item from controller");
};

export { getItem, getItems, createItem, updateItem, deleteItem };
