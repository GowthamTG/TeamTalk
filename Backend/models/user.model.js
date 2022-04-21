const collection = require("./DB/connection");
const { COLLECTION_NAME } = require("../keys/constant");

var crypto = require("crypto");

const userModel = {};

const getSaltAndHash = (password) => {
  console.log(password);
  const salt = crypto.randomBytes(16).toString("hex");
  console.log(salt);
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return { salt: salt, hash: hash };
};

userModel.createUser = (userDetails) => {
  return collection
    .getCollection(COLLECTION_NAME.USERS)
    .then((model) => {
      const { salt, hash } = getSaltAndHash(userDetails.password);
      userDetails.salt = salt;
      userDetails.hash = hash;
      delete userDetails.password;
      model.create(userDetails);
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

userModel.getAllUserWithEmail = (email) => {
  console.log(email);
  return collection
    .getCollection(COLLECTION_NAME.USERS)
    .then((model) => model.find({}))
    .then((response) => response);
};

module.exports = userModel;
