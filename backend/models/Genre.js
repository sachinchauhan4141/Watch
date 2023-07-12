const mongoose = require("mongoose");
const { Schema } = mongoose;

const genreSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique:true
  },
  title: {
    type: String,
    required: true,
    unique:true
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("genre", genreSchema);
