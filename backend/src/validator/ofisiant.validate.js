import Joi from "joi";

export const ofisiantCreateJoi = Joi.object({
    username: Joi.string().required(),
    kafe_id: Joi.string().required(),
    admin_login: Joi.string().required(),
    admin_password: Joi.string().required(),
}).required();

export const ofisiantUpdateJoi = Joi.object({
    username: Joi.string(),
    kafe_id: Joi.string(),
    admin_login: Joi.string(),
    admin_password: Joi.string(),
}).required();
