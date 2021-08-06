const router = require('express').Router();
const User = require('../models/User');
const Preferences = require('../models/Preferences');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation, profileValidation } = require('../validation');
const { valid } = require('joi');




//BUILD PROFILE REQUEST:
router.post(('/buildprofile'), async (req, res) => {

    const { error } = profileValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    const preferences = new Preferences({

        bio: req.body.bio,
        classyear: req.body.classyear,
        major: req.body.major
        

    });

    try {
        const savedPreferences = await preferences.save();
        res.send({ preferences: preferences._id});
        //Added by Abhitej
        //res.send(user); 
        console.log('yay')

    } catch (err) {
        res.status(400).send(err);
        console.log('fail')
    }



})

module.exports = router;