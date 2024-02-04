import Joi from "joi";

export const kafeCreateJoi = Joi.object({
    kafe_nomi: Joi.string().required(),
    telefon_raqam: Joi.string().required(),
    direktor: Joi.string().required(),
    location: Joi.string().required(),
    admin_login: Joi.string().required(),
    admin_password: Joi.string().required(),
}).required();

export const kafeUpdateJoi = Joi.object({
    kafe_nomi: Joi.string(),
    telefon_raqam: Joi.string(),
    direktor: Joi.string(),
    location: Joi.string(),
    admin_login: Joi.string(),
    admin_password: Joi.string(),
}).required();
