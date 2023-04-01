const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

exports.verifyToken= (req, res, next) =>{
    let token = req.headers['auth'];
    if(token){
        token = token.split(' ')[1];
        jwt.verify(token, JWT_SECRET, (err, valid)=>{
            if(err) res.status(401).send("NO Valid Token Found!!!");
            else next();
        })
    }else{
        res.status(403).send("NO Token Found!!!")
    }
}