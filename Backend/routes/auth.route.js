const express = require("express");
const router = express.Router();
const password = require("passport");
const User = require("../models/user.model");
// const { isLoggedIn } = require("../middlewares/isLoggedIn");
const passport = require("passport");
const userService = require("../services/auth.service");

router.post(
  "/login",
  passport.authenticate("local", { failureFlash: true, failureRedirect: true }),
  (req, res, next) => {
    let redirectUrl = req.session.returnTo || "/explore";
    delete req.session.returnTo;
    console.log(redirectUrl);
    res.send({ message: "ok", redirectUrl: redirectUrl });
  }
);
