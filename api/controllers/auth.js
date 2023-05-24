import { request, response } from "express";
import { generateJWT } from "../helpers/generate-jwt.js";
import { User } from "../models/users.js";
import bcrypt from "bcryptjs";
import { googleVerify } from "../helpers/google-verify.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // verify email exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "User or password is invalid!",
      });
    }

    // Verify user is active
    const isActive = user.state;
    if (!isActive) {
      return res.status(400).json({
        msg: "User or password is invalid!",
      });
    }

    //varify password
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).send({
        msg: "User or password is invalid!",
      });
    }
    //generate JWT
    const token = await generateJWT(user.id);

    res.send({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Talking with admin",
    });
  }
};

export const googleSignIn = async (req = request, res = response, next) => {
  const { id_token } = req.body;

  try {
    const { firstName, email, profilePhoto } = await googleVerify(id_token);

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        firstName,
        email,
        password: ":P",
        profilePhoto,
        google: true,
      });
    }

    // user state is false
    if (!user.state) {
      return res.status(401).send({
        msg: "Talking with admin, user is blocked",
      });
    }

    //generate JWT
    const token = await generateJWT(user.id);

    res.send({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      ok: false,
      msg: "Error verifying google sign in",
    });
  }
};
