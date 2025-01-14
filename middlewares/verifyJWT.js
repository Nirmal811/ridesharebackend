const jwt = require('jsonwebtoken');
const verifyJWT = (req,res,next)=>
{
    const token = req.headers.jwttoken;
    
    if(!token)
    {
        res.status(403).send({Message: "No token provided"});
        return;
    }
    try
    {
        const secretKey = 'anvitha';
        const decoded = jwt.verify(token,secretKey);
        next();
    }
    catch(err)
    {
        res.status(403).send({Message:"Token is invalid"});
        return;
    }   
}

module.exports = {verifyJWT};