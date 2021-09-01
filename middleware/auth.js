const jwt = require("jsonwebtoken");
const secureToken = "your-token-secret"


const config = process.env;

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization
    // 'Bearer '"tokennumber"
    if (!token) { 
        res.status(403).json({error:"please provide a token"})
    }
    else {
        jwt.verify(token.split(" ")[1], secureToken, (err, value) => {
            if(err) res.status(500).json({error: 'filed to authenticate token'})
            req.user = value.data
            next()
        })
    }
}
