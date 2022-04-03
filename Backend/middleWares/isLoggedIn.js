// module.exports.isLoggedIn = (req, res, next) => {
//   if (!req.isAuthenticated()) {
//     req.session.returnTo = req.originalUrl; //To store the target Url and redirect to it, once logged in

//     req.flash("error", "You must be logged in first!");
//     return res.redirect("/login");
//   }
//   next();
// };

const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../keys/constant");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (token) {
      jwt.verify(token, JWT_KEY.SECRET);
      next();
    } else {
      throw 401;
    }
  } catch (error) {
    res.status(401).json({ message: "FAILED" });
  }
};
