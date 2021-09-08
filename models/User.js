const { boolean, number } = require('joi');
const mongoose = require('mongoose');


const dormSchema = new mongoose.Schema({

    nonsmoker: {

        type: Boolean,

    },

    cleanliness: {

        type: Number,
        min: 1,
        max: 5

    },

    asleepBy:{

        type: String,
        min: 4,
        max: 5

    },

    awakeBy:{
        
        type: String
        //min: 4,
        //max: 5

    },

    //make sure campuses are made in specific order and can be mapped [5,3,2,1,4]
    campusSelection:{
        type: Array
        //required: true

    },
    
    roomates: {

        type: Number,
        min: 1,
        max: 5

    },

})


const preferencesSchema = new mongoose.Schema({

    bio: {

        type: String,
        min: 4,
        max: 512

    },

    classyear: {

        type: String,
        min: 4,
        max: 4

    },
    
    major: {

        type: String,
        min: 4,
        max: 32

    },

    dormSpecs: {

        type: dormSchema,

    },

});


const userSchema = new mongoose.Schema({

    token: {
        type: String
    },

    name: {

        type: String,
        required: true,
        min: 1,
        max: 64

    },

    email: {

        type: String,
        required: true,
        min: 6,
        max: 64

    },

    password: {

        type: String,
        required: true,
        min: 8,
        max: 64

    },

    preferences: {

        type: preferencesSchema,
        required: true,
        

    },

    matches: {
        type: Array,
        required: true,
    },

    seen: {
        type: Array,
        required: true,
    },

    date: {

        type: Date,
        default: Date.now()

    }

});






module.exports = mongoose.model('User', userSchema);
