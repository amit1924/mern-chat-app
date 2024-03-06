import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("connect to MongoDB");
  } catch (e) {
    console.log(`error connecting to MongoDB , error: ${e.message}`);
  }
};

export default connectToMongoDB;
