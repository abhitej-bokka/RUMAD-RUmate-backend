const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation, profileValidation } = require('../validation');
const { valid } = require('joi');


//REGISTER REQUEST:
router.post(('/register'), async (req, res) => {
    console.log('Registration Post Request Started')

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
        preferences: req.body.preferences,  
        campusSelection: req.body.preferences.dormSpecs.campusSelection,
        matches: req.body.matches,
        seen: req.body.seen

    });

    const token = jwt.sign(
        { _id: user._id}, 
        process.env.JWT_SECRET, 
        {expiresIn: "2h",}
        );
    user.token = token;
    

    try {
        const savedUser = await user.save();
        res.send({ user: user._id, token: user.token }); 
        console.log('User is Registered')

    } catch (err) {
        res.status(400).send(err);
        console.log('User is not Registered')

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
    const token = jwt.sign(
        { _id: user._id}, 
        process.env.JWT_SECRET, 
        {expiresIn: "2h",}
        );
    user.token = token;

    res.send({

        token: token,
        _id: user._id

    });

    console.log('Displayed')

});


module.exports = router;