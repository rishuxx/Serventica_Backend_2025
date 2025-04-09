const mongoose = require("mongoose");
const { Schema } = mongoose;

//schema model

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    trim: true,
    minlength: 3,
  },
  photoURL: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  //create a model isntance
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
