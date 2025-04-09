const mongoose = require("mongoose");
const { Schema } = mongoose;

//create scheama for menu items
const menuSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
  },
  des: String,
  image: String,
  category: String,
  rating: String,
  price: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//create model

const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;
