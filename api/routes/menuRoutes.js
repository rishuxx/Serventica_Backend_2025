const express = require("express");
const Menu = require("../models/Menu");
const router = express.Router();
const menuController = require("../controllers/menuControllers");

//get all menu items
router.get("/", menuController.getAllMenuItems);

// post a menu router
router.post("/", menuController.postMenuItem);

// delete a menu item
router.delete("/:id", menuController.deleteMenu);

// get a single menu item
router.get("/:id", menuController.singleMenuItem);

// update a menu item
router.patch("/:id", menuController.updateMenuItem);

module.exports = router;
