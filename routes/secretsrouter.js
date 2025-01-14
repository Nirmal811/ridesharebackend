const express=require("express");
const {verifyJWT} = require("../middlewares/verifyJWT")
//const {loginHandler,registerHandler, verifyHandler} = require("../controllers/authcontroller");
const {secretsHandler, addsecrethandler} = require("../controllers/secretscontroller");

// Creating express Router
const secretsRouter=express.Router();

// Handling login request
secretsRouter.route("/getsecrets").get([verifyJWT],secretsHandler);
secretsRouter.route("/addsecrets").post([verifyJWT],addsecrethandler);
module.exports={secretsRouter};