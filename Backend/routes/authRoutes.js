const express = require("express");
const router = express.Router();
const usersService = require("../services/user.service");


router.post("/login", (req, res, next) => {
  usersService
    .loginUser(req.body)
    .then((response) => res.send(response))
    .catch((error) => next(error));
});

router.post("/register", (req, res, next) => {
  usersService
    .createUser(req.body)
    .then((response) => res.send(response))
    .catch((error) => next(error));
});



module.exports = router;
