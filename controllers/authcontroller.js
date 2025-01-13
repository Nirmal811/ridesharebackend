const {User} = require('../models/usermodel');
const { sendmail,validateEmail } = require('../Services/sendmail');
const jwt = require('jsonwebtoken');

const verifyHandler = async(req, res)=>
{
    const usertoken = req.params.token;
    console.log(req);
    try {
        const secretKey = 'anvitha';
        const decoded = jwt.verify(usertoken, secretKey);
        console.log(decoded);
        const user = new User({
            username: decoded.username,
            password: decoded.password,
        });
        try{
            await user.save();
            console.log("Saved successfully");
            res.status(200).send("User Saved Succesfully");
        }
        catch(err){
            console.log(err);
        }

    } catch (error) {
        return res.status(400).send('Invalid Token');
    }

}
const registerHandler = async(req, res)=>
{
    console.log(req.body);
    if(validateEmail(req.body.useremail))
    {
        const payload = { username: req.body.username, password: req.body.password };
        const secretKey = 'anvitha';
        const options = { expiresIn: '1h' };

        const token = jwt.sign(payload, secretKey, options);

        console.log('JWT Token:', token);

        sendmail(req.body.useremail,'Email verification from rideshare',`Please click the link below\nhttp://localhost:8000/api/v1/auth/verify/${token}`);
        res.status(200).send({Message:"Verification Mail Sent Successfully"});
    }
    else
    {
        res.status(401).send({Message:"Email should end with only @smail.iitm.ac.in"});
    }
}
const loginHandler = async(req, res)=>
{
    const findResult = await User.findOne({
        username: req.body.username
    });
    console.log(findResult);
    if(findResult && findResult.password === req.body.password)
    {
        const secretKey = 'anvitha';
        const user = { username: req.body.username, password: req.body.password };
        const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
        console.log("user token generated successfully");
        res.status(200).send({ Message: "Login Successful",Token: token });
    }
    else
    {
        res.status(401).send({Message:"Invalid Login Credentials!!"})
    }
}
module.exports = {loginHandler,registerHandler,verifyHandler};