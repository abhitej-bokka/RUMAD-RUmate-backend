const mongoose = require('mongoose');
const Preference = require('./Preferences');
const userSchema = new mongoose.Schema({

    name: {

        type: String,
        required: true,
        min: 6,
        max: 255

    },
    email: {

        type: String,
        required: true,
        min: 6,
        max: 255

    },
    password: {

        type: String,
        required: true,
        min: 6,
        max: 1024

    },
    preferences: {

        type: Preference,
        required: true,
        

    },
    date: {

        type: Date,
        default: Date.now()

    }
    

});

module.exports = mongoose.model('User', userSchema);
