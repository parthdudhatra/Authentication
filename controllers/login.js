const User = require('../model/user');
const bcrypt = require('bcryptjs');
const round = 10;

const jwt = require('jsonwebtoken');
const secureToken = "your-token-secret"

exports.login = (function(req, res) {
    User.findOne({email: req.body.email})
    .then(user => {
        // console.log("User data check")
        // if(!user) return res.status(404).json({error: 'error genereted'})
        // else{
        //     bcrypt.compare(req.body.password, user.password, (error, match) => {
        //         if(error) return res.status(500).json(error)
        //         else if(match) {
        //            const userToken = ({token: genereteToken(user)})
        //             return res.status(200).json({user, userToken})
        //             }
        //         else res.status(403).json({error: 'password do not match'})
        //     })
        // }
        if(!user) return res.status(404).json({error: 'error genereted'})
        else{
            // console.log("else method run")
            bcrypt.compare(req.body.password, user.password, (error, match) => {
                if(error) return res.status(500).json(error)
                else if(match) {
                    // console.log("password match")
                   const userToken = ({token: genereteToken(user)})
                   const userObj = user.toObject();
                   delete userObj.password;
                    return res.status(200).json({ user: userObj, userToken})
                    }
                else res.status(403).json({error: 'password do not match'})
            })
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
});
function genereteToken(user){
    return jwt.sign({data : user}, secureToken, {expiresIn: '24h'})
}