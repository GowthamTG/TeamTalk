const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4200",
  },
});

const { v4: uuidV4 } = require("uuid"); //for generating random Room IDs
const bodyParser = require("body-parser");
const expressSanitizer = require("express-sanitizer");
const mongoose = require("mongoose");
const session = require("express-session");
const methodOverride = require("method-override"); //for executing PUT requests
const MongoStore = require("connect-mongo");
const { isLoggedIn } = require("./middleWares/isLoggedIn");
const cors = require("cors");

// ---------------------Importing Database models-------------------------------------- //

const Message = require("./models/message");
const Conversation = require("./models/meetConversation.model");
const SessionManager = require("./modules/UserSessionModule");

// ---------------------Importing Website Routes-------------------------------------- //

const errorLogger = require("./utils/errorLogger");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes")

// ----------------------------------CORS---------------------------------------- //

app.use(cors());

// ---------------------Website Port & Keys-------------------------------------- //

const port = process.env.PORT || 3000;
const { MongoDBURL } = require("./Global");
const db_URL = MongoDBURL.URL;

let inFeedRoute = false;
let username = "";
var sessionManager = new SessionManager();

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));


// ------------------------Connection to Mongoose---------------------------------------- //

const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

// ------------------------ Session creation and storage --------------------------- //

app.use(
  session({
    store: MongoStore.create({ mongoUrl: db_URL }),
    secret: "notagoodsecret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer()); // to sanitize inputs
app.use("/peerjs", peerServer);


// ---------------------------Using imported Routes------------------------------------- //

app.use(authRoutes);
app.use(userRoutes);
app.use("/messages",messageRoutes);
app.use(errorLogger);


// -----------send message from the Socket to conversation participants------------------ //

async function sendMessageToParticipants(data) {
  let conversation = await Conversation.findOne({
    roomId: data.activeConversationId,
  });

  let members = conversation.members;

  members = members.filter(function (member) {
    if (!data.fromMeet) return member != data.userId;
    else return member;
  });

  members.forEach((member) => {
    let user = sessionManager.getUser(member);

    if (user) {
      io.to(user.socketId).emit("newMessage", data);
    } else console.log("message not sent");
  });
}

var users = 0;

io.on("connection", function (socket) {
  console.log("User connected");

  socket.on("disconnect", function (socket) {
    console.log("user disconnected");
  });
  //join room
  socket.on("join", function (data) {
    //display the number of users in room
    users += 1;
    console.log(users);
    io.sockets.emit("usercount", { count: users + " person joined " });
    //end

    // user joining the particular room
    socket.join(data.room);

    console.log(data.user + "joined the room:" + data.room);

    //inform other on the room about event
    socket.broadcast.to(data.room).emit("new user joined", {
      user: data.user,
      message: "has joined this room ",
    });
  });
  //leave room

  socket.on("leave", function (data) {
    //number of users in room
    users--;
    io.sockets.emit("usercount", { count: "" + users });
    console.log(users);
    //end

    console.log(data.user + "has left the room " + data.room);
    socket.broadcast
      .to(data.room)
      .emit("left room", { user: data.user, message: "has left the room " });
    socket.leave(data.room);
  });

  //sending message
  socket.on("message", function (data) {
    io.in(data.room).emit("new message", {
      user: data.user,
      message: data.message,
    });
  });
});

server.listen(port);
