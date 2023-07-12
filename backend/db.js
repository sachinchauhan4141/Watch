const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://Sachin_chauhan:MognoAtlas4141@cluster0.xcejt8u.mongodb.net/watchnowtv";

const connectToMongo = async () => {
    try {
      mongoose.set("strictQuery", false);
      mongoose.connect(mongoURI);
      console.log("Connected to Mongo Successfully!");
    } catch (error) {
      console.log("db.js ---> "+error);
    }
  };

module.exports = connectToMongo;