const Carts = require("../models/Carts");

//get cart using email
const getCartByEmail = async (req, res) => {
  try {
    const email = req.query.email;
    const result = await Carts.find({ email }).exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Post cart when add cart clicked

const addToCart = async (req, res) => {
  const { menuItemId, title, des, image, price, quantity, email } = req.body;
  try {
    // Check if the product already exists in the cart
    const existingCartItem = await Carts.findOne({ menuItemId, email });
    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      const updatedCartItem = await existingCartItem.save();
      return res.status(200).json(updatedCartItem);
    }

    // Create a new cart item
    const cartItem = await Carts.create({
      menuItemId,
      title,
      des,
      image,
      price,
      quantity,
      email,
    });
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete a cart item

const deleteCart = async (req, res) => {
  const cartId = req.params.id;
  try {
    const deletedCart = await Carts.findByIdAndDelete(cartId);
    if (!deletedCart) {
      return res.status(401).json({ message: "Cart Items not found" });
    }
    res.status(200).json({ message: "deleted Cart item" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//updatecart item
const updateCart = async (req, res) => {
  const cartId = req.params.id;
  const { menuItemId, title, des, image, price, quantity, email } = req.body;

  try {
    const updatedCart = await Carts.findByIdAndUpdate(
      cartId,
      { menuItemId, title, des, image, price, quantity, email },
      { new: true, runValidators: true }
    );
    if (!updatedCart) {
      return res.status(404).json({ message: "Cart Items not found" });
    }
    res.status(200).json({ updatedCart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//single item

const getsingleCart = async (req, res) => {
  const cartId = req.params.id;

  try {
    const cartItem = await Carts.findById(cartId);
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCartByEmail,
  addToCart,
  deleteCart,
  updateCart,
  getsingleCart,
};
