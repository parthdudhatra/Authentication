const User = require('../model/user');
const bcrypt = require('bcrypt');
const round = 10;

exports.registration = (function(req, res) {
    const user = new User(req.body)
   const checkpass =  bcrypt.hash(user.password, round, (err, hash) => {
       user.password = hash;
        if(err) {
            return res.status(403).send(err);
        }
        else{
            // var newUser = new User(req.body,checkpass);

            user.save()
                .then(user=>{
                    res.status(200).json(user);
                })
                .catch(error=>{
                    res.status(500).json(error);
               })
        }
    })
})