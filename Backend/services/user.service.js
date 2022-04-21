const userModel = require("../models/user.model");
const meetConversationModel = require("../models/meetConversation.model");

const { ApiError } = require("../objectCreator/objectCreator");
const jwt = require("jsonwebtoken");

const { JWT_KEY } = require("../keys/constant");

const userService = {};

userService.createUser = (userDetails) => {
  try {
    return userModel
      .getUserByEmail(userDetails.email)
      .then((response) => {
        if (response) throw new ApiError("User Already Exists", 409);
        return true;
      })
      .then((canCreate) => {
        if (canCreate) {
          return userModel.createUser(userDetails).then((response) => ({
            message: `User Created`,
          }));
        }
      });
  } catch (statusCd) {
    throw new ApiError("Unknown error", statusCd);
  }
};

userService.loginUser = async (loginDetails) => {
  try {
    const userData = await userModel.getUserByEmail(loginDetails.email);
    console.log(userData);
    if (!userData) throw 401;
    else {
      const isNotMatch = userData.validPassword(
        loginDetails.password,
        userData.hash,
        userData.salt
      );

      if (!isNotMatch) throw 400;
      else {
        const message = `LOGIN_SUCCESS`;
        const name = userData.name;
        const email = userData.email;
        const id = userData._id;
        const ownedMeets = userData.ownedMeets;
        const payload = {
          id: userData._id,
          ownedMeets: userData.ownedMeets,
          name: userData.name,
          email: userData.email,
        };
        var token = jwt.sign(payload, JWT_KEY.SECRET, {
          expiresIn: "24h",
        });
        return { id, message, name, email, token, ownedMeets };
      }
    }
  } catch (statusCd) {
    console.log(statusCd);
    throw new ApiError("Invalid Email or Password", statusCd);
  }
};

userService.getAllUserWithEmail = (email) => {
  try {
    return userModel
      .getAllUserWithEmail(email)
      .then((response) => {
        return response;
      })
      .then((users) => users);
  } catch (statusCd) {
    throw new ApiError("Unknown Error", statusCd);
  }
};

userService.getAllMeetsWithIds = (user) => {
  try {
    console.log(user);
    return meetConversationModel
      .getAllMeetsWithIds(user.userId)
      .then((response) => {
        console.log(response);
        return { response };
      })
      .then((meets) => meets);
  } catch (statusCd) {
    throw new ApiError("Unknown Error", statusCd);
  }
};

userService.createMeet = (meetData) => {
  try {
    return meetConversationModel
      .createMeet(meetData)
      .then((response) => {
        return { response: response, message: "MEET CREATED SUCCESSFULLY" };
      })
      .then((meet) => meet);
  } catch (statusCd) {
    throw new ApiError("Unknown Error", statusCd);
  }
};


module.exports = userService;
