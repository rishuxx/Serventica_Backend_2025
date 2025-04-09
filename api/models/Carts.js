const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  menuItemId: String,

  title: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
  },
  des: String,
  image: String,
  price: Number,
  quantity: {
    type: Number,
    default: 1,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
});

const Carts = mongoose.model("Cart", cartSchema);

module.exports = Carts;
