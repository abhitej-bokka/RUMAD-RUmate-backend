const router = require('express').Router();
const User = require('../models/User');
const Preferences = require('../models/Preferences');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verify = require('./verifyToken');
//added
const { registerValidation, loginValidation, profileValidation } = require('../validation');
const { valid } = require('joi');

//GET USER REQUEST:
router.get(('/getUser/:userId'), verify, function (req, res) {

    const token = req.header('auth-token');
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(verified._id);

    if(req.params.userId != verified._id){
        return res.status(404).send('Auth-token does not match userID')
    }


    //Finds User by Id given in request link
    User.findById(req.params.userId)
        .then(userFound => {
            if (!userFound) {return res.status(404).end();}

            //Sends all of user's information
            return res.status(200).json(userFound);
        })
        .catch(err => next(err));
    console.log('User Found')
})

//GET ALL USERS REQUEST:
router.get(('/getAllUsers'), function (req, res) {
    
    User.find({}, function (err, users) {
        if (err){
            res.send('Somthing is Wrong');
            next();
        }

        res.json(users);
        console.log('All users received')
    })
    
})


router.get(('/getAllUserIds'), function (req, res) {
    //const query = { "name" : "Lebums Games" }
    User.find({}, {_id: 1},function (err, users) {
        if (err){
            res.send('Somthing is Wrong');
            next();
        }

        res.json(users);
        console.log('All users received')
    })



    //res.send(collection.find(query));
    
})





//EDIT USER REQUEST:
router.put('/editUser/:userId', verify, async (req, res) => {

    const { error } = profileValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    //We duplicate the user found by ID
    const user = await User.findById(req.params.userId);
    
    if(!user) return res.status(404).send('User account not found.');

    const token = req.header('auth-token');
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(verified._id);

    if(req.params.userId != verified._id){
        return res.status(404).send('Auth-token does not match userID')
    }


    //We make all necessary changes to profile and send it back
    user.name = req.body.name;
    user.email = req.body.email;
    //We don't change password here, that should be a new method if needed.
    //user.preferences = req.body.preferences;
    user.preferences.bio = req.body.preferences.bio;
    user.preferences.classyear = req.body.preferences.classyear;
    user.preferences.major = req.body.preferences.major;

    //Changing dormSpecs
    //user.preferences.dormSpecs.nonsmoker = req.body.preferences.dormSpecs.nonsmoker;
    user.preferences.dormSpecs = req.body.preferences.dormSpecs;
    //user.preferences.dormSpecs.campusSelection = req.body.preferences.dormSpecs.campusSelection ;

    //We should not be changing matches, but this is for testing
    //user.matches = req.body.matches;

   
    


    user.save()

    res.status(200).send(user);
    console.log('User Information Updated')
   })

module.exports = router;




/* 

List of requests needed:

//HAVE IMPLEMENTED JWT TOKENS, SHOULD BE GOOD NOW

//get request -- I DONT KNOW HOW TO DEAL WITH PICS - FIX PLZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ
	get current profile to display in settings

//get request to show a user profile - BASICALLY DONE
	get query of 20 unseen users and display with swipe left and swipe right gestures

    ///post/patch request -- DONE 
	store a user in the seen collection

    /post/patch request -- DONE 
	store a user in matches collection

    //patch request - DONE
	user wants to update profile settings

    //post/patch request - ALMOST DONE
	user onboards on to the application, selects preferences, and adds pictures.
    */
