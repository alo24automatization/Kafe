import Joi from "joi";

export const loginJoi = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
}).required();
