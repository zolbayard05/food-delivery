import mongoose from "mongoose";

const URI = process.env.MONGODB_URI;

export const connectDb = async () => {
  try {
    if (!URI) {
      console.log("uri baihgui baina");
      return;
    }

    await mongoose.connect(URI);
    console.log("DB amjilttai holbogdloo");
  } catch (error) {
    console.log("DB holbogdohod aldaa garlaa", error);
  }
};
