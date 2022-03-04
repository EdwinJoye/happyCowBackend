const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
  //   console.log(req.headers);
  if (req.headers.authorization) {
    const token = req.headers.authorization.replace("Bearer", "");
    // console.log(token);
    const user = await User.findOne({ token: token });
    // console.log("authentification", user);
    if (user) {
      req.user = user;
      return next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
module.exports = isAuthenticated;
