import mongoose from "mongoose";

const main = async () => {
  try {
    await mongoose.connect(
      `${process.env.MONGODB_CONN}${process.env.MONGODB_NAME}`
    );
  } catch (error) {
    console.log(error);
  }
};

export default main;
