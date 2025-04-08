const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const UserModel = require("../models/userModel");
const UserSessionModel = require("../models/userSessionModel");
require("dotenv").config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const auth = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log(token)

      const userSessionObject = await UserSessionModel.findOne({
        sessionToken: token,
        isActive: true,
      });

      if (!userSessionObject) {
        console.log("No user session");
        res.status(401);
        throw new Error("Not authorized");
      }

      const decodedSessionToken = jwt.verify(token, JWT_SECRET_KEY);

      try {
        req.user = await UserModel.findById(decodedSessionToken.userId);
        console.log("User found:", req.user);
      } catch (err) {
        console.error("Error finding user:", err);
        res.status(401).json({
          message: "Not authorized",
        });
      }
      next();
    } catch (err) {
      console.log("Inside catch block in middleware of authentication");
      res.status(401).json({
        message: "Not authorized",
      });
    }
  } else {
    console.log("No token found");
    res.status(401).json({
      message: "Not authorized",
    });
  }
});

module.exports = {
  auth
};
