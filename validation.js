const { preferences } = require('joi');
const Joi = require('joi');

//validate registration request:
const registerValidation = data => {

    const Schema = Joi.object({

        name: Joi.string()
            .min(1)
            .max(64)
            .required(),
        email: Joi.string()
            .min(6)
            .max(64)
            .required()
            .email(),
        password: Joi.string()
            .min(8)
            .max(64)
            .required(),
        preferences: {
            bio: Joi.string()
                .min(4)
                .max(512),
            classyear: Joi.string()
                .min(4)
                .max(4),
            major: Joi.string()
                .min(4)
                .max(32),
            dormSpecs:{ 
                nonsmoker: Joi.boolean(),
                cleanliness: Joi.number()
                    .min(1)
                    .max(5),
                asleepBy: Joi.string()
                    .min(4)
                    .max(5),
                awakeBy: Joi.string()
                    .min(4)
                    .max(5),
                campusSelection: Joi.array().items(Joi.number().default([])),
                roomates: Joi.number()
                    .min(1)
                    .max(5),
            }

        },
        matches: Joi.array().items(Joi.string().default([])),

        seen: Joi.array().items(Joi.string().default([]))

            

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

        name: Joi.string()
            .min(1)
            .max(64)
            .required(),
        email: Joi.string()
            .min(6)
            .max(64)
            .required()
            .email(),
        preferences: {
            bio: Joi.string()
                .min(4)
                .max(512)
                .required(),
            classyear: Joi.string()
                .min(4)
                .max(4)
                .required(),
            major: Joi.string()
                .min(4)
                .max(32)
                .required(),
                dormSpecs:{ 
                    nonsmoker: Joi.boolean(),
                    cleanliness: Joi.number()
                        .min(1)
                        .max(5),
                    asleepBy: Joi.string()
                        .min(4)
                        .max(5),
                    awakeBy: Joi.string()
                        .min(4)
                        .max(5),
                    campusSelection: Joi.array().items(Joi.number().default([])),
                    roomates: Joi.number()
                        .min(1)
                        .max(5),
                }
        },
        matches: Joi.array().items(Joi.string().default([])),
        seen: Joi.array().items(Joi.string().default([]))



    });
    
    return Schema.validate(data);


}

const selectionValidation = data => {

    const Schema = Joi.object({

        matched: Joi.boolean()
            .required(),
        userSelected: Joi.string()
            .required(),

    });
    
    return Schema.validate(data);


}





module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.profileValidation = profileValidation;
module.exports.selectionValidation = selectionValidation;

