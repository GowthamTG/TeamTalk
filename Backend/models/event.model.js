const collection = require("./DB/connection");
const { COLLECTION_NAME } = require("../keys/constant");
var crypto = require("crypto");
var mongoose = require("mongoose");

const eventModel = {};

const getSaltAndHash = () => {
  const salt = crypto.randomBytes(32).toString("hex");
  return salt;
};

eventModel.getAllEvent = (userId) => {
  return collection
    .getCollection(COLLECTION_NAME.EVENTS)
    .then((model) => {
      return model.find({ members: mongoose.Types.ObjectId(userId) });
    })
    .then((response) => response);
};

eventModel.createEvent = (meetData) => {
  meetData.meetId = getSaltAndHash();
  console.log(meetData);
  return collection
    .getCollection(COLLECTION_NAME.EVENTS)
    .then((model) => {
      model.create(meetData);
    })
    .then((response) => response);
};

// userModel.getUserByEmail = (userEmail) => {
//   return collection
//     .getCollection(COLLECTION_NAME.MEETCONVERSATIONS)
//     .then((model) => model.findOne({ email: userEmail }))
//     .then((response) => response);
// };

// userModel.statusChange = (userDetails) => {
//   return collection
//     .getCollection(COLLECTION_NAME.MEETCONVERSATIONS)
//     .then((model) =>
//       model.updateOne({ email: userDetails.email }, { verified: true })
//     )
//     .then((response) => response);
// };

// userModel.changePassword = (userDetails) => {
//   return collection
//     .getCollection(COLLECTION_NAME.MEETCONVERSATIONS)
//     .then((model) =>
//       model.updateOne(
//         { email: userDetails.email },
//         { password: userDetails.password }
//       )
//     )
//     .then((response) => response);
// };

// userModel.addRegisteredEvent = (Details) => {
//   return collection
//     .getCollection(COLLECTION_NAME.MEETCONVERSATIONS)
//     .then((model) =>
//       model.updateMany(
//         { email: { $in: Details.emails } },
//         { $push: { eventsRegistered: Details.eventId } }
//       )
//     )
//     .then((response) => response);
// };

// userModel.editProfile = (userDetails) => {
//   return collection
//     .getCollection(COLLECTION_NAME.MEETCONVERSATIONS)
//     .then((model) => model.updateOne({ email: userDetails.email }, userDetails))
//     .then((response) => response);
// };

// userModel.getMeets = () => {
//   return collection
//     .getCollection(COLLECTION_NAME.MEETCONVERSATIONS)
//     .then((model) => {
//       model.find({});
//     })
//     .then((response) => response);
// };

// userModel.getUserByEmailArray = (emails) => {
//   return collection
//     .getCollection(COLLECTION_NAME.MEETCONVERSATIONS)
//     .then((model) => model.find({ email: { $in: emails } }))
//     .then((response) => response);
// };

// userModel.updateToken = (userEmail) => {
//   token = crypto.randomBytes(36).toString("hex");
//   return collection
//     .getCollection(COLLECTION_NAME.MEETCONVERSATIONS)
//     .then((model) => model.updateOne({ email: userEmail }, { token: token }))
//     .then((response) => response);
// };

// userModel.getAllUserWithEmail = (email) => {
//   console.log(email);
//   return collection
//     .getCollection(COLLECTION_NAME.MEETCONVERSATIONS)
//     .then((model) => model.find({}))
//     .then((response) => response);
// };

module.exports = eventModel;
