const express = require('express')
const router = express.Router()
const User = require('../model/user');

const { registration } = require('../controllers/registration');
const { login } = require('../controllers/login');
const { verifyToken } = require('../middleware/auth');

// Register
router.post("/register", registration);
    
// Login
router.post("/login", login);
// middleware
// router.get('/jwt-test', verifyToken, (req, res) => {
//     res.status(200).json(req.user)
// })

router.get("/welcome", verifyToken,(req, res) => {
    res.status(200).send(req.user);
  });

module.exports = router;