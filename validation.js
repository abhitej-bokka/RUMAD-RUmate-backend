const { preferences } = require('joi');
const Joi = require('joi');

//validate registration request:
const registerValidation = data => {

    const Schema = Joi.object({

        name: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required(),
        preferences: {
            bio: Joi.string()
                .min(4)
                .required(),
            classyear: Joi.string()
                .min(4)
                .max(4)
                .required(),
            major: Joi.string()
                .min(4)
                .required(),
        }


    });
    
    return Schema.validate(data);

}

//validate login request:
const loginValidation = data => {

    const Schema = Joi.object({

        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()

    });

    return Schema.validate(data);

}


//validate buildprofile request:
const profileValidation = data => {

    const Schema = Joi.object({

        bio: Joi.string()
            .min(4)
            
            .required(),
        classyear: Joi.string()
            .min(2)
            
            .required(),
        major: Joi.string()
            .min(4)
            
            .required()
    });

    return Schema.validate(data);

}




module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.profileValidation = profileValidation;

