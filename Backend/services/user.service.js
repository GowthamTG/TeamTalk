// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

const userModel = require("../models/user.model");
const meetConversationModel = require("../models/meetConversation.model");

const { ApiError } = require("../objectCreator/objectCreator");
const jwt = require("jsonwebtoken");
// const { JWT_KEY } = require("../keys/constant");
// const bcryptPassword = require("../utils/bcrypt.password");
// const mailer = require("./mail.service");
// const eventService = require("./event.service");

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
    if (!userData) throw 404;
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

// userService.verifyEmail = (userDetails) => {
//   try {
//     return userModel.getUserByEmail(userDetails.email).then((response) => {
//       if (response) {
//         if (response.token === userDetails.token) {
//           return userModel.statusChange(userDetails).then((res) => {
//             return userModel.updateToken(userDetails.email).then((res) => true);
//           });
//         }
//         throw 404;
//       }
//     });
//   } catch (statusCd) {
//     throw new ApiError("Not Verified", statusCd);
//   }
// };

// userService.getUser = (userDetails) => {
//   console.log("asads");
//   try {
//     return userModel
//       .getUserByEmail(userDetails.email)
//       .then((response) => {
//         if (!response) {
//           throw 404;
//         }
//         return response;
//       })
//       .then((user) => user);
//   } catch (statusCd) {
//     throw new ApiError("User Not Found", statusCd);
//   }
// };

// userService.getUserByEmailArray = (Details) => {
//   let emails = [];
//   if ("members" in Details) {
//     emails.push(...Details.members);
//   }
//   emails.push(Details.email);
// try {
//   return userModel
//     .getUserByEmailArray(emails)
//     .then((response) => {
//       if (!response) throw new ApiError("User does not exist", 400);
//       return response;
//     })
//     .then((users) => users);
// } catch (statusCd) {
//   throw new ApiError("Unknown Error", statusCd);
// }
// };

// userService.editProfile = (userDetails) => {
//   const email = userDetails.file
//     ? JSON.parse(userDetails.body.userContent).email
//     : userDetails.body.email;
//   try {
//     return userModel
//       .getUserByEmail(email)
//       .then((response) => {
//         if (!response) throw 404;
//         return response;
//       })
//       .then((user) => {
//         if (user) {
//           if (userDetails.file) {
//             const url = userDetails.protocol + "://" + userDetails.get("host");
//             const imgPath =
//               url + "/FileSystem/images/users/" + userDetails.file.filename;
//             userDetails = JSON.parse(userDetails.body.userContent);
//             userDetails.userImage = imgPath;
//           } else {
//             userDetails = userDetails.body;
//           }
//           return userModel
//             .editProfile(userDetails)
//             .then((response) => response);
//         }
//       });
//   } catch (statusCd) {
//     throw new ApiError("User does not exist", statusCd);
//   }
// };

// userService.forgetPassword = (userDetails) => {
//   try {
//     return userModel.getUserByEmail(userDetails.email).then((response) => {
//       if (response) {
//         response.use = userDetails.use;
//         mailer.mailSender(response);
//         return { message: "USER_FOUND" };
//       }
//       throw 404;
//     });
//   } catch (statusCd) {
//     throw new ApiError("User Not Found", statusCd);
//   }
// };

// userService.changePassword = async (userDetails) => {
//   try {
//     const newHashPassword = await bcryptPassword.hashPassword(userDetails);
//     return userModel.getUserByEmail(userDetails.email).then((response) => {
//       userDetails.password = newHashPassword;
//       return userModel.changePassword(userDetails).then((res) => {
//         if (res) {
//           return { message: "PASSWORD_UPDATED" };
//         }
//         throw 400;
//       });
//     });
//   } catch (statusCd) {
//     throw new ApiError("Password Cannot Be Updated", statusCd);
//   }
// };

// userService.userDashboard = async (userDetails) => {
//   try {
//     return userModel.getUserByEmail(userDetails.email).then((response) => {
//       const name = response.name;
//       return eventService
//         .getEventByIdArray(response.eventsRegistered)
//         .then((events) => ({ name, events }));
//     });
//   } catch (statusCd) {
//     throw new ApiError("Something Went Wrong", statusCd);
//   }
// };

// userService.toRegister = (Details) => {
//   try {
//     users = Details.users;
//     teamDetails = Details.teamDetails;
//     eventId = teamDetails.eventId ? teamDetails.eventId : teamDetails.event._id;
//     users.forEach(function (user) {
//       if (user.eventsRegistered.includes(eventId)) throw 409;
//     });
//     let emails = [];
//     if (teamDetails.hasOwnProperty("members")) {
//       emails.push(...teamDetails.members);
//       emails.push(teamDetails.email);
//     } else {
//       emails.push(users[0].email);
//     }
//     var details = { emails: emails, eventId: eventId };
//     return userModel.addRegisteredEvent(details).then((res) => res);
//   } catch (statusCd) {
//     throw new ApiError(`A Member already registerd in event`, statusCd);
//   }
// };

module.exports = userService;
