const Menu = require("../models/Menu");

const getAllMenuItems = async (req, res) => {
  try {
    const menus = await Menu.find({});
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// post a new  item

const postMenuItem = async (req, res) => {
  const newItem = req.body;
  try {
    const result = await Menu.create(newItem);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete a menu item
const deleteMenu = async (req, res) => {
  const menuId = req.params.id;
  // console.log(menuId);

  try {
    const deletedItem = await Menu.findByIdAndDelete(menuId);
    // console.log(deletedMenu);

    if (!deletedItem) {
      return res.status(404).json({ message: "Menu not found" });
    }

    res.status(200).json({ message: "Menu Item Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// find a single menu item
const singleMenuItem = async (req, res) => {
  const menuId = req.params.id;
  try {
    const menu = await Menu.findById(menuId);
    // console.log(menu);
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update a menu item
const updateMenuItem = async (req, res) => {
  const menuId = req.params.id;
  console.log(menuId);
  const { title, des, image, category, price, rating } = req.body;
  // console.log(req.body)
  try {
    const updatedMenu = await Menu.findByIdAndUpdate(
      menuId,
      { title, des, image, category, price, rating },
      { new: true, runValidators: true }
    );

    console.log(updatedMenu);

    if (!updatedMenu) {
      return res.status(404).json({ message: "updated Item not found" });
    }

    res.status(200).json(updatedMenu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllMenuItems,
  postMenuItem,
  deleteMenu,
  singleMenuItem,
  updateMenuItem,
};
