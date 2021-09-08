const router = require('express').Router();
const User = require('../models/User');
const Preferences = require('../models/Preferences');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verify = require('./verifyToken');
const { registerValidation, loginValidation, profileValidation, selectionValidation } = require('../validation');
const { valid } = require('joi');

router.put('/editList/:userId', verify, async (req, res) => {

    const { error } = selectionValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //We duplicate the user's matches & seens
    const user = await User.findById(req.params.userId);
    //const prevMatches = await User.findById(req.params.userId).matches;
    //const prevSeen = await User.findById(req.params.userId).seen;
    
    if(!user) return res.status(404).send('User account not found.');
    //If user matched, then add them to both matched & seen, otherwise just seen

    const token = req.header('auth-token');
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(verified._id);

    if(req.params.userId != verified._id){
        return res.status(404).send('Auth-token does not match userID')
    }





    if (req.body.matched){
        user.matches.push(req.body.userSelected);
        user.seen.push(req.body.userSelected);
        console.log('Match')
    }else{
        user.seen.push(req.body.userSelected);
        console.log('Did not Match')
    }

    user.save()

    res.status(200).send(user);
    console.log('User Selection Updated')
   })




router.get(('/getAllUsersSeenLists'), function (req, res) {
    //const query = { "name" : "Lebums Games" }
    User.find({}, {seen: 1},function (err, users) {
        if (err){
            res.send('Somthing is Wrong');
            next();
        }

        res.json(users);
        console.log('All users received')
    })



    //res.send(collection.find(query));
    
})




router.get(('/getQueue/:userId'), async (req, res) => {
    //get userId
    const user = await User.findById(req.params.userId);
    const id = req.params.userId;
    //console.log(id);
    if(!user) return res.status(404).send('User account not found.');

    const token = req.header('auth-token');
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(verified._id);

    if(req.params.userId != verified._id){
        return res.status(404).send('Auth-token does not match userID')
    }


    //users.seen query
    //const query = { "name" : "Lebums Games" }
    //searches for all users that do not include id in seen lists
    User.find({seen: { $ne: id }},function (err, users) {
        if (err){
            res.send('Somthing is Wrong');
            next();
        }

        res.json(users);
        console.log('All users received')
    }).limit(2)
    //limited to one person
    //res.send(collection.find(query));    
})

module.exports = router;