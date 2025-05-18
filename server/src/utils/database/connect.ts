import mongoose from "mongoose";

const connection = (connectionString: string) => {
  if (connectionString) {
    mongoose.connect(connectionString, {
      dbName: "bookSync",
    });
    console.log("mongoose connected successfully");
  } else {
    console.error("MongoDB URI should be a string");
  }
};

export default connection;
