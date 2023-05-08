import mongoose from 'mongoose'

const main = async () => {

    // console.log(process.env.MONGODB_NAME);
    try {
        await mongoose.connect(
          `${process.env.MONGODB_CONN}${process.env.MONGODB_NAME}`
        );
    } catch (error) {
        console.log(error)
    }
}

export default main