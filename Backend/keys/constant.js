const COLLECTION_NAME = {
  USERS: "User",
  MEETCONVERSATIONS: "meetconversations",
  EVENTS: "Events",
  // STATES: "states",
  // CITIES: "cities",

  // TEAMS: "Teams",
};
const JWT_KEY = {
  SECRET: "BLA!BLA!",
};

const HOST = {
  HOST: `http://localhost:4200/`,
};

const MongoDBURL = {
  // URL: "mongodb://localhost:27017/test",
  URL: "mongodb+srv://GowthamTG:saYNDwuQUEvtjFs6@cluster0.s3jhi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
};

module.exports = { COLLECTION_NAME, JWT_KEY, HOST, MongoDBURL };
