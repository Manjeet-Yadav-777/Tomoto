import mongoose from "mongoose";
import { configDotenv } from "dotenv";

const db = async () => {
  await mongoose
    .connect(`mongodb://127.0.0.1:27017/Resturant`)
    .then(() => console.log(`Databse Connected`))
    .catch((err) => console.log(err));
};

export default db;
