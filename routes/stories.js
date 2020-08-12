const Story = require("../models/story");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const User = require("../models/User");
const mongoose = require("mongoose");
const storyController = require("../controllers/story");
const {
  userAuth,
  userLogin,
  checkRole,
  userRegister,
  serializeUser
} = require("../utils/Auth");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null,new Date().toISOString()+file.originalname);
  }
})

const upload = multer({ storage: storage })


router.get("/",userAuth,storyController.view_all);
router.get("/:storyId",userAuth,storyController.view_by_id);
router.post("/add",userAuth,upload.single('image'),storyController.add_story);
router.delete("/:id",userAuth,storyController.delete_story);
router.delete("/",userAuth,checkRole(["admin"]),storyController.delete_all);


module.exports = router;

