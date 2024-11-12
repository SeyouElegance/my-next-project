import mongoose from "mongoose";

let connected = false;

const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  // check if we are already connected
  if (connected) {
    return;
  }

  try {
    // connect to the database
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};

export default connectToDB;
