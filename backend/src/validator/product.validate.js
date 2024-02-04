import Joi from "joi";

export const productCreateJoi = Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required(),
    desc: Joi.string().required(),
    menu_id: Joi.string().required(),
}).required();

export const productUpdateJoi = Joi.object({
    title: Joi.string(),
    price: Joi.number(),
    desc: Joi.string(),
    menu_id: Joi.string(),
}).required();
