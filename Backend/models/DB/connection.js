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
  favourites: { type: Schema.Types.Array, default: [] },
  userStatus: {
    type: String,
  },
  hash: String,
  salt: String,
});
const MessageSchema = mongoose.Schema({
  conversationId: {
    type: String,
  },
  sender: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  option: {
    type: String,
  },
  sentAt: {
    type: Date,
    default: Date.now(),
  },
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

const EventsSchema = mongoose.Schema({
  meetId: {
    type: String,
  },
  createdBy: { type: Schema.Types.ObjectId, ref: "users" },
  title: {
    type: String,
    default: `Teams Meeting ${Date.now()}`,
  },
  description: {
    type: String,
    default: `Meeting at ${Date.now()}`,
  },
  members: [{ type: Schema.Types.ObjectId, ref: "users" }],
  priority: {
    type: String,
    default: `medium`,
  },
  resizable: {
    beforeStart: {
      type: Boolean,
      default: false,
    },
    afterEnd: {
      type: Boolean,
      default: false,
    },
  },
  start: {
    type: Date,
  },
  end: {
    type: Date,
  },
});

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
        case COLLECTION_NAME.EVENTS:
          return db.model(collectionName, EventsSchema);
        case COLLECTION_NAME.MESSAGES:
          return db.model(collectionName, MessageSchema);
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
