const mongoose = require('mongoose');
const Preference = require('./Preferences');

const preferencesSchema = new mongoose.Schema({

    bio: {

        type: String,
        required: true,
        min: 4,
        max: 512

    },
    classyear: {

        type: String,
        required: true,
        min: 4,
        max: 4

    },
    major: {

        type: String,
        required: true,
        min: 4,
        max: 32

    }
    
    
    
    
});


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

        type: preferencesSchema,
        required: true,
        

    },
    date: {

        type: Date,
        default: Date.now()

    }

});






module.exports = mongoose.model('User', userSchema);
