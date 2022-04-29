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
  console.log(req.body);
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
  usersService
    .getAllMeetsWithIds(req.body)
    .then((response) => res.send(response))
    .catch((error) => next(error));
});

router.get("/change-status/:emailId/:status", (req, res,next) => {
  usersService
    .setStatus(req.params.emailId, req.params.status)
    .then((response) => res.send(response))
    .catch((error) => next(error));
});
module.exports = router;
