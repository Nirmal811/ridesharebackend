const { Secret } = require("../models/secretmodel");
const jwt = require('jsonwebtoken');
const secretsHandler = async(req, res)=>
{
    try{
        const secret_details = await Secret.find();
        res.status(200).send({'secrets':secret_details});
    }
    catch(err)
    {
        res.status(404).send({Message:"No data available"});
    }  
}
const addsecrethandler =  async(req, res)=>
{
    try
    {
        console.log("Hello");
        const token = req.headers.jwttoken;
        console.log(token);
        const secretKey = 'anvitha';
        const decoded = jwt.verify(token, secretKey);
        const username = decoded.username;
        console.log(username);
        const secretObject = new Secret({
            username:username,
            heading:req.body.heading,
            body:req.body.body
        })
        try{
            await secretObject.save();
            console.log("secret saved successfully");
            res.status(200).send({Message: "secret saved successfully"});
        }
        catch(err)
        {
            res.status(404).send({Message: "secret adding failed, please try again!"});
        }
    }
    catch(err)
    {
        res.status(404).send({Message:"Invalid credentials"});
    }
}

module.exports = {secretsHandler, addsecrethandler};