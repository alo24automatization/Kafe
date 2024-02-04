import Joi from "joi";

export const zoneCreateJoi = Joi.object({
    title: Joi.string().required(),
    kafe_id: Joi.string().required(),
}).required();

export const zoneUpdateJoi = Joi.object({
    title: Joi.string(),
    kafe_id: Joi.string(),
}).required();
