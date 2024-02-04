import Joi from "joi";

export const menuCreateJoi = Joi.object({
    title: Joi.string().required(),
    kafe_id: Joi.string().required(),
}).required();

export const menuUpdateJoi = Joi.object({
    title: Joi.string(),
    kafe_id: Joi.string(),
}).required();
