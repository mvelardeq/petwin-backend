import { generateJWT } from "../helpers/generate-jwt.js";
import { User } from "../models/users.js";
import bcrypt from "bcryptjs";

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
