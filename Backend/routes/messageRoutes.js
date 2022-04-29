const router            = require("express").Router();
// const Message           = require("../models/message");
// const Conversation      = require("../models/meetConversation");
// const User              = require("../models/user");

const messageService = require('../models/message.model')


router.post("/add-message",(req, res, next) => {
  messageService
    .createMessage(req.body)
    .then((response) => res.send(response))
    .catch((error) => next(error));
});

// This route will get all the messages of a user
router.get("/get-messages/:userId/:receiverId", (req,res,next) =>{
  messageService
    .getUserSpecificMessages(req.params.userId,req.params.receiverId)
    .then((response) => {res.send(response);})
    .catch((error) => next(error));
})

router.get("/get-contacts/:userId",(req,res,next) =>{
  messageService.getUserChats(req.params.userId)
  .then((response) => {
    console.log(response);
    res.send(response);})
  .catch((error) => next(error));
})

// -------------------Fetch all messages of a conversation---------------------------- //
// -------------------------Create new message--------------------------------------- //

// router.post("/messages/:conversationId/:senderId/:text", async (req, res) => {
//   const newMessage = new Message({
//     conversationId: req.params.conversationId,
//     sender: req.params.senderId,
//     text: req.params.text
//   });


//   try {
//     const savedMessage = await newMessage.save();
//     res.status(200).json(savedMessage);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
// router.get("/messages/:conversationId", async (req, res) => {
//   try {
//     const messages = await Message.find({
//       conversationId: req.params.conversationId,
//     });

//     let names = {}

//     let conversation = await Conversation.findOne({
//       roomId: req.params.conversationId
//     })

//     let members = conversation.members;

//     for (member of members) {
//       const user = await User.findOne({
//         _id: member
//       })
//       names[member] = user.name;
//     }

//     res.status(200).json({ messages: messages, names: names });

//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


module.exports = router;