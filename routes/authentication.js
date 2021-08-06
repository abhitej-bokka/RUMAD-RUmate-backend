const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation, profileValidation } = require('../validation');
const { valid } = require('joi');


//REGISTER REQUEST:
router.post(('/register'), async (req, res) => {

    //check for validation errors:
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check if user already exists:
    const email = await User.findOne({email: req.body.email});
    if (email) return res.status(400).send('Email is already in use!');

    //hash password for storage in database:
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user:
    const user = new User({

        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        preferences: req.body.preferences

    });

    try {
        const savedUser = await user.save();
        res.send({ user: user._id }); 
        //res.send(user)

    } catch (err) {
        res.status(400).send(err);

    }

});


//LOGIN REQUEST:
router.post(('/login'), async (req, res) => {

    //check for validation errors:
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check if user email already exists:
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Email cannot be found!');

    //check if user password is correct:
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Password is invalid!');

    //create and assign java web token:
    const token = jwt.sign({ _id: user._id}, process.env.JWT_SECRET);
    res.header('auth-token', token).send(token);
    console.log('displayed')

});


module.exports = router;