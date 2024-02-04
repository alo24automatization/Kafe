import Joi from "joi";

export const stolCreateJoi = Joi.object({
    stol_nomi: Joi.string().required(),
    kafe_id: Joi.string().required(),
    zone_id: Joi.string().required(),
    ofisiant_id: Joi.string(),
}).required();

export const stolUpdateJoi = Joi.object({
    stol_nomi: Joi.string(),
    kafe_id: Joi.string(),
    zone_id: Joi.string(),
    ofisiant_id: Joi.string(),
}).required();

export const stolActiveCode = Joi.object({
    code: Joi.number().required(),
}).required();
