const User = require("../models/User");
const mongoose = require("mongoose");

const {
  userAuth,
  userLogin,
  checkRole,
  userRegister,
  serializeUser
} = require("../utils/Auth");

exports.get_all_users = function(req,res){
	User.find().then(result=>{
        res.send(result);
      }).catch(err=>{
        res.send(err);
      })
  }

  exports.register_user = async function(req,res){
      await userRegister(req.body, "user", res);
  }

  exports.register_admin = async function(req,res){
      await userRegister(req.body, "admin", res);
  }

   exports.login_admin = async function(req,res){
       await userLogin(req.body, "admin", res);
  }

   exports.login_user = async function(req,res){
       await userLogin(req.body, "user", res);
  }

   exports.view_profile =  function(req,res){
       return res.json(serializeUser(req.user));
  }
  exports.delete_user = function(req,res){
        User.remove({}).then(result=>{
        res.send(result);
      }).catch(err=>{
        res.send(err);
      })
  }
  exports.delete_user_by_id = function(req,res){
  	  User.remove({_id:req.params.userId}).then(result=>{
        res.send(result);
      }).catch(err=>{
        res.send(err);
      })
  }
  