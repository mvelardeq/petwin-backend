import { response, request } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/users.js";

export const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).send({
      msg: "There's no token on the request!",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPUBLICKEY);

    //User that is authenticated
    const user = await User.findById(uid);

    //VErifying user exist
    if (!user) {
      return res.status(401).send({
        msg: "User doesn't exist in dB",
      });
    }

    //Verifying uid state is true
    if (!user.state) {
      return res.status(401).send({
        msg: "User with state in false",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      msg: "Token invalid",
    });
  }
};
