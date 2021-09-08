const express = require('express');
const multer = require('multer')
const app = express();




const dotenv = require('dotenv');
const mongoose = require('mongoose');

//import all routes:
const authenticationRoute = require('./routes/authentication');

const profilebuilderRoute = require('./routes/profilebuilder');

const matchmakingRoute = require('./routes/matchmaking');

//config enviroment file:
dotenv.config();

//connect to database:
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected successfully to database!')
);

//middlewares: 
app.use(express.json());

//route middlewares:
app.use('/api', authenticationRoute);

app.use('/api/user', profilebuilderRoute);

app.use('/api/matchmaker', matchmakingRoute);


//listener:
app.listen(3000, () => console.log('Server is now runnning!'));