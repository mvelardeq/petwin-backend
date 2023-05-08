import {User} from '../models/users.js'
import bcrypt from 'bcryptjs'



const getItem = async(req, res) => {
  const {id} = req.params
    const users = await User.find({_id:id})
  res.send(users);
};

const getItems = async(req, res) => {
    const users = await User.find()
  res.send(users);
};

const createItem = async(req, res) => {

  const {google,...others} = req.body
  
  //verifiy if email exist
  const existEmail = await User.findOne({email:others.email})
  if (existEmail) {
    return res.status(400).send({
      ok: false,
      msg: "This email is used",
    });
  }
  
  //encrypt password
  const salt = bcrypt.genSaltSync(10)
  others.password = bcrypt.hashSync(others.password, salt);

  //Save DB
  const user = await User.create(others);

  res.send(user);
};

const updateItem = (req, res) => {
  res.send("update item from controller");
};

const deleteItem = (req, res) => {
  res.send("delete item from controller");
};

export { getItem, getItems, createItem, updateItem, deleteItem };
