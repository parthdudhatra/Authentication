const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authrouter = require('./routes/route');
dotenv.config();

//const MONGO_URL = 'mongodb+srv://parth12:ayQhqWGrtqxlFevJ@cluster0.4js1p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

// db conection
mongoose.connect(
    process.env.MONGO_URL,
     {useNewUrlParser: true, useUnifiedTopology: true}
)
.then(() => console.log('DB connected'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connection.on('err' , err => {
    console.log(`DB connection error ${err.message}`);
})

app.get('/', (req, res) => {
    res.json({ message: "Welcome to application."});
})

app.use('/api/auth', authrouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT , (req, res) => {
    console.log('listening on port' + PORT); 
})
