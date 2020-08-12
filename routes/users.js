const router = require("express").Router();
const User = require("../models/User");
const mongoose = require("mongoose");
const userController = require("../controllers/user");
// Bring in the User Registration function
const {
  userAuth,
  userLogin,
  checkRole,
  userRegister,
  serializeUser
} = require("../utils/Auth");



// Admin Protected Route

router.get("/getallusers",userAuth,checkRole(["admin"]),userController.get_all_users);
router.post("/register-user",userController.register_user);
router.post("/register-admin",userController.register_admin);
router.post("/login-user",userController.login_user);
router.post("/login-admin",userController.login_admin);
router.get("/profile",userAuth,userController.view_profile);
router.delete("/deleteallusers",userAuth,checkRole(["admin"]),userController.delete_user);
router.delete("/:userId",userAuth,checkRole(["admin"]),userController.delete_user_by_id);

module.exports = router;
