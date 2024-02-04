import Joi from "joi";

export const orderCreateJoi = Joi.object({
    product_id: Joi.string().required(),
}).required();

export const orderUpdateJoi = Joi.object({
    action: Joi.string().valid('add', 'remove').required(),
}).required();
