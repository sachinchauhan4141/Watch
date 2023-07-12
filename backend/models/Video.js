const mongoose = require("mongoose");
const { Schema } = mongoose;

const videoSchema = new Schema({
  genre: {
    type: Number,
    required: true,
  },
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
  url: {
    type: String,
    required: true,
    unique:true
  },
  src: {
    type: String,
    required: true,
    unique:true
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("video", videoSchema);
