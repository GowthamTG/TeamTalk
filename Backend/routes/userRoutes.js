const express = require("express");
const router = express.Router();
const usersService = require("../services/user.service");

// ------------------Get and send name of the user by her ID--------------------- //

// router.post("/user/:userId", async (req, res) => {
//   const user = await User.findById(req.params.userId);

//   if (user) res.send({ name: user.name });
//   else res.send({ name: "User" });
// });

// router.get("/user/:username", async (req, res) => {
//   const user = await User.findOne({
//     username: req.params.username,
//   });

//   if (user) res.send({ id: user._id, name: user.name });
//   else res.send({ id: "00" });
// });

router.get("/find-by-username", async (req, res) => {
  usersService
    .getAllUserWithEmail(req.query.username)
    .then((response) => res.send(response))
    .catch((error) => next(error));
});

module.exports = router;
