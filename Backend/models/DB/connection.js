const mongoose = require("mongoose");
const crypto = require("crypto");
const { Schema } = mongoose;

const { COLLECTION_NAME, MongoDBURL } = require("../../keys/constant");

mongoose.Promise = global.Promise;

const connection = {};

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  ownedMeets: {
    type: Array,
    default: [],
  },
  hash: String,
  salt: String,
});

UserSchema.methods.validPassword = (password, op, salt) => {
  var hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  console.log(op);
  console.log(hash);
  return op === hash;
};

const MeetConversationSchema = mongoose.Schema(
  {
    roomId: {
      type: String,
    },
    owner: { type: Schema.Types.ObjectId, ref: "users" },
    name: {
      type: String,
      default: `Teams Meeting ${Date.now()}`,
    },
    members: [{ type: Schema.Types.ObjectId, ref: "users" }],
    isPersonal: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

connection.getCollection = (collectionName) => {
  const DB_HOST = MongoDBURL.URL;
  console.log(DB_HOST);
  return mongoose
    .connect(`${DB_HOST}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((db) => {
      switch (collectionName) {
        case COLLECTION_NAME.USERS:
          return db.model(collectionName, UserSchema);
        case COLLECTION_NAME.MEETCONVERSATIONS:
          return db.model(collectionName, MeetConversationSchema);
      }
    })
    .catch((err) => {
      let error = new Error("Could not connect to database");
      console.log(err);
      error.status = 500;
      throw error;
    });
};

module.exports = connection;
