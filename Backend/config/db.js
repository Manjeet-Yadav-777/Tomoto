import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const db = async () => {
  await mongoose
    .connect(`${process.env.MONGO_URI}/Resturant`)
    .then(() => console.log(`Databse Connected`))
    .catch((err) => console.log(err));
};

export default db;
