const collection = require("./DB/connection");
const { COLLECTION_NAME } = require("../keys/constant");


const messageModel = {};

messageModel.createMessage = (messageDetails) => {
    return collection
        .getCollection(COLLECTION_NAME.MESSAGES)
        .then((model) => {
            console.log(model)
        model.create(messageDetails);
        })
        .then((response) => response);
}

messageModel.getUserChats = (senderId) => {
    return collection.getCollection(COLLECTION_NAME.MESSAGES)
    .then(model => model.find({$or:[{sender: senderId},{receiver: senderId}]}))
    .then((response) =>  response);
}

messageModel.getUserSpecificMessages = (userId,receiverId) =>{
    return collection.getCollection(COLLECTION_NAME.MESSAGES)
    .then(model => model.find({$or:[{sender: userId, receiver: receiverId},{sender: receiverId, receiver: userId}]}))
    .then((response) =>  response);
}
module.exports = messageModel;