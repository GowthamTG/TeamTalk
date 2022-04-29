const userModel = require("../models/user.model");
const meetConversationModel = require("../models/meetConversation.model");
const messageModel = require("../models/message.model");

const { ApiError } = require("../objectCreator/objectCreator");
const jwt = require("jsonwebtoken");

const { JWT_KEY } = require("../keys/constant");

const messageService = {};
// This service creates a new message
messageService.createMessage = (messageDetails) => {
  return messageModel.createMessage(messageDetails)
  .then(response =>{
      if(response) return response;
      throw new ApiError("Messages not sent", 404);
  });
  };

// This service will get a specific contact message for example - vidhya and sibhia conversation
messageService.getUserSpecificMessages = (userId,receiverId) =>{
    return messageModel.getUserSpecificMessages(userId,receiverId)
    .then(response =>{
        if(response) return response;
        throw new ApiError("Messages not found", 404);
    });
};

// This service gets all the contact of the user 
messageService.getUserChats = (senderId) => {
    return messageModel.getUserChats(senderId)
    .then(response =>{
        if(response) return response;
        throw new ApiError("Messages not found", 404);
    });
  }
module.exports = messageService;