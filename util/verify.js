const jwt = require("jsonwebtoken");
const {createError} = require('./createError')

const verifyToken = (req,res, next)=>{
    const token = req.cookies.access_token;
    if (!token) return next(createError(401, "No token provided!"));
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return next(createError(401, "Invalid token!"));
      req._id = decoded.id;
      req.type = decoded.type;
     
      next();
      
})
    return
}

module.exports = {verifyToken}