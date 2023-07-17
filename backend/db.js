const mongoose = require("mongoose");

const connectToMongo = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Mongo Successfully! - " + conn.connection.host);
  } catch (error) {
    console.log("db.js ---> " + error);
  }
};

module.exports = connectToMongo;
