const express = require("express");
const router = express.Router();
const usersService = require("../services/user.service");

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

router.post("/create-event", async (req, res) => {
  usersService
    .createEvent(req.body)
    .then((response) => res.send(response))
    .catch((error) => next(error));
});

router.post("/get-all-events-data", async (req, res) => {
  usersService
    .getAllEvent(req.body)
    .then((response) => res.send(response))
    .catch((error) => next(error));
});

router.post("/get-all-meets-data", async (req, res) => {
  usersService
    .getAllMeetsWithIds(req.body)
    .then((response) => res.send(response))
    .catch((error) => next(error));
});

router.post("/update-favourites", async (req, res) => {
  console.log("FAV ROUTE");
  usersService
    .addFavouriteUser(req.body)
    .then((response) => res.send(response))
    .catch((error) => next(error));
});

module.exports = router;
