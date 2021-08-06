const mongoose = require('mongoose');

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
        min: 2,
        max: 8

    },
    major: {

        type: String,
        required: true,
        min: 4,
        max: 32

    }
    
    
    
    
});

module.exports = mongoose.model('Preferences', preferencesSchema);
