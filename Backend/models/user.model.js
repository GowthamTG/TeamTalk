const collection = require("./DB/connection");
const { COLLECTION_NAME } = require("../keys/constant");

const bcrypt = require("bcrypt");
var crypto = require("crypto");

const userModel = {};

userModel.createUser = (userDetails) => {
  return collection
    .getCollection(COLLECTION_NAME.USERS)
    .then((model) => {
      bcrypt.hash(userDetails.password, 10).then((hash) => {
        userDetails.password = hash;
        userDetails.token = crypto.randomBytes(36).toString("hex");
        mailer.mailSender(userDetails);
        model.create(userDetails);
      });
    })
    .then((response) => response);
};

userModel.getUserByEmail = (userEmail) => {
  return collection
    .getCollection(COLLECTION_NAME.USERS)
    .then((model) => model.findOne({ email: userEmail }))
    .then((response) => response);
};

userModel.statusChange = (userDetails) => {
  return collection
    .getCollection(COLLECTION_NAME.USERS)
    .then((model) =>
      model.updateOne({ email: userDetails.email }, { verified: true })
    )
    .then((response) => response);
};

userModel.changePassword = (userDetails) => {
  return collection
    .getCollection(COLLECTION_NAME.USERS)
    .then((model) =>
      model.updateOne(
        { email: userDetails.email },
        { password: userDetails.password }
      )
    )
    .then((response) => response);
};

userModel.addRegisteredEvent = (Details) => {
  return collection
    .getCollection(COLLECTION_NAME.USERS)
    .then((model) =>
      model.updateMany(
        { email: { $in: Details.emails } },
        { $push: { eventsRegistered: Details.eventId } }
      )
    )
    .then((response) => response);
};

userModel.editProfile = (userDetails) => {
  return collection
    .getCollection(COLLECTION_NAME.USERS)
    .then((model) => model.updateOne({ email: userDetails.email }, userDetails))
    .then((response) => response);
};

userModel.getUsers = () => {
  return collection
    .getCollection(COLLECTION_NAME.USERS)
    .then((model) => {
      model.find({});
    })
    .then((response) => response);
};

userModel.getUserByEmailArray = (emails) => {
  return collection
    .getCollection(COLLECTION_NAME.USERS)
    .then((model) => model.find({ email: { $in: emails } }))
    .then((response) => response);
};

userModel.updateToken = (userEmail) => {
  token = crypto.randomBytes(36).toString("hex");
  return collection
    .getCollection(COLLECTION_NAME.USERS)
    .then((model) => model.updateOne({ email: userEmail }, { token: token }))
    .then((response) => response);
};

userModel.getAllUserSimilarName = (email) => {
  return collection
    .getCollection(COLLECTION_NAME.USERS)
    .then((model) => model.find({ email: "/^" + email + "/" }))
    .then((response) => response);
};

module.exports = userModel;
