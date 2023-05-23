import jwt from "jsonwebtoken";

export const generateJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRETORPUBLICKEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Token couldnt generate");
        } else {
          resolve(token);
        }
      }
    );
  });
};
