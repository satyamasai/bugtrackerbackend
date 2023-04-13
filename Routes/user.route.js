const { Router } = require("express");
require("dotenv").config();
const userController = Router();
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../Models/user.model");

// const { Authentication } = require("../Middlewares/Authentication");

// user sign up --------------------------------------------
// --------------------------------------------------------------
userController.post("/signup", async (req, res) => {
  const { email, password, firstname,lastname } = req.body;
  // console.log(email,name,password)
  const existing_user = await userModel.findOne({ email });

  if (existing_user) {
    res.send({ msg: "user already exist" });
    return;
  }

  const new_user = new userModel({
    email,
    password,
    firstname,
    lastname
  });

  await new_user.save();
  res.send({ msg: "signup succesfull.." });
});

// ----------user-login-----------------------------------------------------------------------
// -------------------------------------------------------------------------------------------
userController.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    const user_id = user._id;
    if (user.password == password && user.email == email) {
      const token = jwt.sign({ user_id }, process.env.SECRET);

      const email = user.email;
      const id = user._id;

      const document = {
        email: email,
        id: id,
        token: token,
      };
      res.send({ msg: "Login successfull", document });
    } else {
      res.send({ msg: "Login failed" });
    }
  } else {
    res.status(500).send({
      msg: "User not found ..please login with correct credentials..",
    });
  }
});
// -------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------

module.exports = {
  userController,
};
