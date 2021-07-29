const express = require('express');
const app = express();

const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

mongoose.connect(

    process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => console.log('connected to database!')

);

app.listen(3000, () => console.log('Server is now running!'));
