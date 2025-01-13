// Importing the module
const express=require("express");
//const {verifyJWT} = require("../middlewares/")
const {loginHandler,registerHandler, verifyHandler} = require("../controllers/authcontroller");

// Creating express Router
const authRouter=express.Router();

// Handling login request
authRouter.route("/register").post(registerHandler)
authRouter.route("/login").post(loginHandler);
authRouter.route("/verify/:token").get(verifyHandler);
module.exports={authRouter};