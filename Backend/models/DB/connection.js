const mongoose = require("mongoose");
const crypto = require("crypto");

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
  hash: String,
  salt: String,
});

UserSchema.methods.setPassword = (password) => {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
};

UserSchema.methods.validPassword = (password, op, salt) => {
  var hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  console.log(op);
  console.log(hash);
  return op === hash;
};

connection.getCollection = (collectionName) => {
  const DB_HOST = MongoDBURL.URL;

  return mongoose
    .connect(`${DB_HOST}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((db) => {
      switch (collectionName) {
        case COLLECTION_NAME.USERS:
          return db.model(collectionName, UserSchema);
      }
    })
    .catch((err) => {
      let error = new Error("Could not connect to database");
      error.status = 500;
      throw error;
    });
};

module.exports = connection;
