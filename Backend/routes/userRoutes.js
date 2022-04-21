const express = require("express");
const router = express.Router();
const usersService = require("../services/user.service");

router.post("/get-all-meets-data", async (req, res) => {
  usersService
    .getAllMeetsWithIds(req.body)
    .then((response) => res.send(response))
    .catch((error) => next(error));
});

router.get("/find-by-username", async (req, res) => {
  console.log(req.query);
  usersService
    .getAllUserWithEmail(req.query.username)
    .then((response) => res.send(response))
    .catch((error) => next(error));
});

router.post("/create-meet", async (req, res) => {
  usersService
    .createMeet(req.body)
    .then((response) => res.send(response))
    .catch((error) => next(error));
});

module.exports = router;
